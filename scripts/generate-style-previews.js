import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENICE_API_BASE = 'https://api.venice.ai/api/v1';
const IMAGE_MODEL = 'nano-banana-pro';
const API_KEY = process.env.VENICE_API_KEY || process.env.VITE_VENICE_API_KEY || 'lnWNeSg0pA_rQUooNpbfpPDBaj2vJnWol5WqKWrIEF';

// Read constants.ts to extract gallery items
const constantsPath = path.join(__dirname, '..', 'constants.ts');
const constantsContent = fs.readFileSync(constantsPath, 'utf-8');

// Extract gallery items array content
const galleryItemsMatch = constantsContent.match(/export const GALLERY_ITEMS: GalleryItem\[\] = \[([\s\S]*?)\];/);
if (!galleryItemsMatch) {
  console.error('Could not find GALLERY_ITEMS in constants.ts');
  process.exit(1);
}

const itemsContent = galleryItemsMatch[1];

// Parse first 5 items (c1-c5) - simpler approach
const items = [];
const targetIds = ['c1', 'c2', 'c3', 'c4', 'c5'];

for (const targetId of targetIds) {
  // Find the item block starting with this ID
  const idPattern = new RegExp(`id:\\s*['"]${targetId}['"]`, 'm');
  const idMatch = itemsContent.match(idPattern);
  
  if (!idMatch) {
    console.warn(`Could not find item ${targetId}`);
    continue;
  }
  
  const idPosition = idMatch.index;
  if (idPosition === -1) continue;
  
  // Find the opening brace before the id (go backwards)
  let itemStart = idPosition;
  for (let i = idPosition - 1; i >= 0; i--) {
    if (itemsContent[i] === '{') {
      itemStart = i;
      break;
    }
    if (itemsContent[i] === '}' || itemsContent[i] === ']') {
      // We've gone too far back
      break;
    }
  }
  
  // Find the matching closing brace for this item
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let itemEnd = itemStart;
  
  for (let i = itemStart; i < itemsContent.length; i++) {
    const char = itemsContent[i];
    const prevChar = i > 0 ? itemsContent[i - 1] : '';
    
    // Track string state (including template literals with backticks)
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
    }
    
    if (!inString) {
      if (char === '{') {
        braceCount++;
      }
      if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          itemEnd = i + 1;
          break;
        }
      }
    }
  }
  
  if (itemEnd === itemStart) {
    console.warn(`Could not parse item block for ${targetId}`);
    continue;
  }
  
  const itemBlock = itemsContent.substring(itemStart, itemEnd);
  
  // Extract fields using regex
  const idMatch2 = itemBlock.match(/id:\s*['"]([^'"]+)['"]/);
  const titleMatch = itemBlock.match(/title:\s*['"]([^'"]+)['"]/);
  const categoryMatch = itemBlock.match(/category:\s*['"]([^'"]+)['"]/);
  const descMatch = itemBlock.match(/description:\s*['"]([^'"]+)['"]/);
  
  // For promptSnippet, we need to handle the template literal with backticks
  // Find the content between promptSnippet: ` and the closing `
  const promptStart = itemBlock.indexOf('promptSnippet: `');
  let promptSnippet = '';
  if (promptStart !== -1) {
    const promptContentStart = promptStart + 'promptSnippet: `'.length;
    // Find the closing backtick that's not escaped
    let promptEnd = promptContentStart;
    for (let i = promptContentStart; i < itemBlock.length; i++) {
      if (itemBlock[i] === '`' && itemBlock[i - 1] !== '\\') {
        promptEnd = i;
        break;
      }
    }
    promptSnippet = itemBlock.substring(promptContentStart, promptEnd);
  }
  
  const imageMatch = itemBlock.match(/imageUrl:\s*['"]([^'"]+)['"]/);
  
  if (idMatch2 && promptSnippet) {
    items.push({
      id: idMatch2[1],
      title: titleMatch ? titleMatch[1] : '',
      category: categoryMatch ? categoryMatch[1] : '',
      description: descMatch ? descMatch[1] : '',
      promptSnippet: promptSnippet,
      imageUrl: imageMatch ? imageMatch[1] : ''
    });
  } else {
    console.warn(`Could not extract all fields for ${targetId}`);
  }
}

console.log(`\nFound ${items.length} items to process:`);
items.forEach(item => console.log(`  - ${item.id}: ${item.title}`));

// Create output directory
const outputDir = path.join(__dirname, '..', 'public', 'style-previews');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

// Function to clean prompt
function cleanPrompt(prompt) {
  let cleaned = prompt.trim();
  // Remove [PROMPT START] and [PROMPT END] markers
  cleaned = cleaned.replace(/\[PROMPT START\]/gi, '').replace(/\[PROMPT END\]/gi, '');
  // Remove markdown code block markers if present
  cleaned = cleaned.replace(/```markdown/gi, '').replace(/```/g, '').trim();
  return cleaned;
}

// Function to generate image
async function generateImage(prompt, outputPath) {
  const cleanPromptText = cleanPrompt(prompt);
  
  console.log(`\nGenerating image for: ${outputPath}`);
  console.log(`Prompt length: ${cleanPromptText.length} characters`);
  
  try {
    const response = await fetch(`${VENICE_API_BASE}/image/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: cleanPromptText,
        width: 1024,
        height: 1024,
        steps: 1, // nano-banana-pro has max 1 step
        format: 'webp',
        return_binary: false,
        safe_mode: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText || `API error: ${response.status}` } };
      }
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const imageBase64 = data.images?.[0];
    
    if (!imageBase64) {
      throw new Error("No image data found in response");
    }

    // Decode base64 and save
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync(outputPath, imageBuffer);
    console.log(`✓ Saved: ${outputPath}`);
    
    return true;
  } catch (error) {
    console.error(`✗ Error generating image: ${error.message}`);
    return false;
  }
}

// Process each item
async function processItems() {
  const updates = [];
  
  for (const item of items) {
    const filename = `${item.id}.webp`;
    const outputPath = path.join(outputDir, filename);
    const relativePath = `/style-previews/${filename}`;
    
    const success = await generateImage(item.promptSnippet, outputPath);
    
    if (success) {
      updates.push({
        oldUrl: item.imageUrl,
        newUrl: relativePath,
        id: item.id
      });
      
      // Wait a bit between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Update constants.ts with new image URLs
  if (updates.length > 0) {
    let updatedContent = constantsContent;
    for (const update of updates) {
      // Replace the imageUrl for this specific item
      const regex = new RegExp(`(id:\\s*['"]${update.id}['"][\\s\\S]*?imageUrl:\\s*['"])${update.oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g');
      updatedContent = updatedContent.replace(regex, `$1${update.newUrl}$2`);
    }
    
    fs.writeFileSync(constantsPath, updatedContent, 'utf-8');
    console.log(`\n✓ Updated constants.ts with ${updates.length} new image URLs`);
  }
  
  console.log('\n✓ Done!');
}

// Run the script
processItems().catch(console.error);

