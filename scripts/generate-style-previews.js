import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENICE_API_BASE = 'https://api.venice.ai/api/v1';
const IMAGE_MODEL = 'nano-banana-pro';
const API_KEY = process.env.VENICE_API_KEY || process.env.VITE_VENICE_API_KEY || '-28c7m7CCiJxA20hQH8fHnxTqTwYFxPvfO3LnkTMgP';

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

// Parse ALL gallery items
const items = [];

// Helper to extract a full item block (from opening { to matching })
function getItemBlock(id) {
  // Find the occurrence of this id
  const idPattern = new RegExp(`id:\\s*['"]${id}['"]`, 'm');
  const idMatch = itemsContent.match(idPattern);
  if (!idMatch || typeof idMatch.index !== 'number') {
    console.warn(`Could not find item ${id}`);
    return null;
  }

  const idPosition = idMatch.index;

  // Walk backwards to find the opening brace for this object
  let itemStart = idPosition;
  for (let i = idPosition; i >= 0; i--) {
    const ch = itemsContent[i];
    if (ch === '{') {
      itemStart = i;
      break;
    }
    if (ch === ']') break; // safety
  }

  // Now walk forward to find the matching closing brace
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let itemEnd = itemStart;

  for (let i = itemStart; i < itemsContent.length; i++) {
    const char = itemsContent[i];
    const prevChar = i > 0 ? itemsContent[i - 1] : '';

    // Track string state (handles ', ", and ` template literals)
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
      if (char === '{') braceCount++;
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
    console.warn(`Could not parse block for ${id}`);
    return null;
  }

  return itemsContent.substring(itemStart, itemEnd);
}

// Collect all IDs first
const idRegex = /id:\s*['"]([^'"]+)['"]/g;
let m;
const allIds = [];
while ((m = idRegex.exec(itemsContent)) !== null) {
  allIds.push(m[1]);
}

// Build items array
for (const id of allIds) {
  const itemBlock = getItemBlock(id);
  if (!itemBlock) continue;

  const titleMatch = itemBlock.match(/title:\s*['"]([^'"]+)['"]/);
  const categoryMatch = itemBlock.match(/category:\s*['"]([^'"]+)['"]/);
  const descMatch = itemBlock.match(/description:\s*['"]([^'"]+)['"]/);

  // Extract promptSnippet content between backticks after "promptSnippet: `"
  const promptStart = itemBlock.indexOf('promptSnippet: `');
  let promptSnippet = '';
  if (promptStart !== -1) {
    const promptContentStart = promptStart + 'promptSnippet: `'.length;
    let promptEnd = promptContentStart;
    let inStr = true; // we're inside the template literal now
    for (let i = promptContentStart; i < itemBlock.length; i++) {
      const ch = itemBlock[i];
      const prev = i > 0 ? itemBlock[i - 1] : '';
      if (ch === '`' && prev !== '\\') {
        promptEnd = i;
        break;
      }
    }
    promptSnippet = itemBlock.substring(promptContentStart, promptEnd);
  }

  const imageMatch = itemBlock.match(/imageUrl:\s*['"]([^'"]+)['"]/);

  if (promptSnippet) {
    items.push({
      id,
      title: titleMatch ? titleMatch[1] : '',
      category: categoryMatch ? categoryMatch[1] : '',
      description: descMatch ? descMatch[1] : '',
      promptSnippet,
      imageUrl: imageMatch ? imageMatch[1] : ''
    });
  } else {
    console.warn(`No promptSnippet found for ${id}`);
  }
}

console.log(`Found ${items.length} total gallery items`);

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
    console.log(`  ✅ Saved: ${path.basename(outputPath)}`);
    
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

// Process each item
async function processItems() {
  const updates = [];
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  const totalItems = items.length;
  
  // Load current constants content for incremental updates
  let currentConstantsContent = constantsContent;
  
  console.log(`\n🚀 Starting to process ${totalItems} items...\n`);
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const filename = `${item.id}.webp`;
    const outputPath = path.join(outputDir, filename);
    const relativePath = `/style-previews/${filename}`;

    // Skip if the preview image file already exists in the folder
    if (fs.existsSync(outputPath)) {
      console.log(`[${i + 1}/${totalItems}] ⏭️  Skipping ${item.id} - ${item.title} (preview already exists)`);
      skippedCount++;
      
      // If constants.ts doesn't point to this local file, update it
      if (!item.imageUrl || !item.imageUrl.startsWith('/style-previews/')) {
        updates.push({
          oldUrl: item.imageUrl,
          newUrl: relativePath,
          id: item.id
        });
      }
      continue;
    }

    console.log(`[${i + 1}/${totalItems}] 🎨 Processing: ${item.id} - ${item.title}`);
    const success = await generateImage(item.promptSnippet, outputPath);
    
    if (success) {
      updates.push({
        oldUrl: item.imageUrl,
        newUrl: relativePath,
        id: item.id
      });
      processedCount++;
      
      // Update constants.ts incrementally (every 5 items or at the end)
      if (updates.length >= 5 || i === items.length - 1) {
        for (const update of updates) {
          const regex = new RegExp(`(id:\\s*['"]${update.id}['"][\\s\\S]*?imageUrl:\\s*['"])${update.oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g');
          currentConstantsContent = currentConstantsContent.replace(regex, `$1${update.newUrl}$2`);
        }
        fs.writeFileSync(constantsPath, currentConstantsContent, 'utf-8');
        console.log(`  💾 Saved progress: ${updates.length} items updated in constants.ts`);
        updates.length = 0; // Clear the updates array
      }
      
      // Wait a bit between requests to avoid rate limiting (2 seconds)
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } else {
      errorCount++;
      console.log(`  ⚠️  Failed to generate image for ${item.id}, continuing...`);
      // Still wait a bit even on error to avoid hammering the API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Final update if there are any remaining updates
  if (updates.length > 0) {
    for (const update of updates) {
      const regex = new RegExp(`(id:\\s*['"]${update.id}['"][\\s\\S]*?imageUrl:\\s*['"])${update.oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g');
      currentConstantsContent = currentConstantsContent.replace(regex, `$1${update.newUrl}$2`);
    }
    fs.writeFileSync(constantsPath, currentConstantsContent, 'utf-8');
  }
  
  console.log(`\n✅ Done! Summary:`);
  console.log(`   📸 Generated: ${processedCount} images`);
  console.log(`   ⏭️  Skipped: ${skippedCount} (already exist)`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total processed: ${processedCount + skippedCount + errorCount}/${totalItems}`);
}

// Run the script
processItems().catch(console.error);

