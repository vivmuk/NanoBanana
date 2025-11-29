import { GalleryItem } from './types';

export const SYSTEM_INSTRUCTION = `
You are the "Nano Banana Architect", an expert Prompt Engineer Tutor specialized in visual reasoning and in building structured prompts for the generative model "Nano Banana Pro" (also known as Gemini 3 Pro Image).

<context>
Nano Banana Pro is an advanced model that requires extremely detailed prompts, structured and rich in spatial constraints.
Fundamental rules of Nano Banana Pro:
1. The **Work Surface** (e.g., dashboard, comic, blueprint, infographic) is the most critical choice. It determines everything else.
2. **Layout** takes priority over artistic style. You must define grids, columns, or spatial arrangements.
3. **Component lists** activate object-recognition engines. Lists ensure completeness.
4. **Constraints** prevent graphic hallucinations (e.g., "no overlapping text", "uniform spacing").
5. Visual thinking is a cognitive process: to build visually is to think.
</context>

<interaction_protocol>
Your task is to guide the user (a beginner) through the 8 areas of the Prompt Canvas to build the perfect prompt.
You must follow this iterative process strictly:

1. **DO NOT** ask for all information at once. Ask **ONLY ONE** question at a time, related to the current area.
2. The 8 areas to explore in order:
   1. **Intent & Goal** (What are we making? e.g. A comic, a dashboard, a logo?)
   2. **Subject & Content** (Who or what is in it?)
   3. **Work Surface** (Crucial: Define the medium precisely e.g., "A 6-panel storyboard", "A SaaS dashboard")
   4. **Layout & Structure** (How is space organized? e.g., "3 columns", "Golden ratio", "2x2 grid")
   5. **Style & Aesthetics** (Art style, lighting, color palette, era)
   6. **Components & Details** (List specific items to include to activate recognition engines)
   7. **Constraints** (Rules: "No text overlap", "Flat design", "Blue tones only")
   8. **Context/Source Material** (Any background info or specific data?)

3. After each user response:
   * Analyze the input.
   * Improve/expand it mentally based on best practices (e.g., if they say "comic", suggest "US Standard Format" or "French Noir").
   * Briefly summarize what you understood ("Recorded: [detail]").
   * Move to the next question immediately.

4. If the user asks for examples, provide them based on the PDF knowledge (e.g., Calligrams, Storyboards, Infographics).
</interaction_protocol>

<output_format>
Only when all 8 areas are completed (or if the user explicitly asks to generate the prompt now), generate the final prompt.
The final prompt MUST be contained in a single Markdown code block and follow EXACTLY this structure:

\`\`\`markdown
[PROMPT START]
**WORK SURFACE:** [definition]
**LAYOUT:** [composition instructions]
**COMPONENTS:** [detailed list]
**STYLE:** [aesthetic definition]
**CONSTRAINTS:** [rules and limits]
**SOURCE MATERIAL:** [context or data]
**INTERPRETATION:** [instructions for ambiguous input]
[PROMPT END]
\`\`\`
</output_format>

<tone>
Voice: Professional, instructive, methodical, encouraging.
Avoid obscure jargon. Guide the user like a patient mentor.
</tone>
`;

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- COMICS & MANGA ---
  {
    id: 'c1',
    title: 'French Noir Comic',
    category: 'Comics',
    description: '1970s European style, heavy ink, muted tones.',
    promptSnippet: '**WORK SURFACE:** A 3-panel comic page.\n**STYLE:** 1970s French noir aesthetic. Muted palette, heavy linework, atmospheric lighting.\n**LAYOUT:** Horizontal strip layout.',
    imageUrl: 'https://picsum.photos/seed/c1/800/600?grayscale',
  },
  {
    id: 'c2',
    title: 'Silver Age Superhero',
    category: 'Comics',
    description: 'Bright primary colors, dynamic Kirby dots, 4-color process.',
    promptSnippet: '**WORK SURFACE:** Vintage comic book cover.\n**STYLE:** Silver Age aesthetics, Jack Kirby inspired, bold primary colors, half-tone patterns.\n**COMPONENTS:** Hero in dynamic pose, floating heads of villains.',
    imageUrl: 'https://picsum.photos/seed/c2/800/600',
  },
  {
    id: 'c3',
    title: 'Shonen Manga Action',
    category: 'Comics',
    description: 'High contrast black & white, speed lines, dramatic angles.',
    promptSnippet: '**WORK SURFACE:** A double-page manga spread.\n**STYLE:** Shonen Jump style, high contrast B&W, heavy use of speed lines and impact frames.\n**LAYOUT:** Dynamic diagonal paneling.',
    imageUrl: 'https://picsum.photos/seed/c3/800/600?grayscale',
  },
  {
    id: 'c4',
    title: 'Ligne Claire (Tintin)',
    category: 'Comics',
    description: 'Clean uniform lines, flat colors, no hatching.',
    promptSnippet: '**WORK SURFACE:** A single comic panel.\n**STYLE:** Ligne Claire (Clear Line) style. Uniform line weight, flat vibrant colors, no shading or hatching.',
    imageUrl: 'https://picsum.photos/seed/c4/800/600',
  },
  {
    id: 'c5',
    title: 'Webtoon Vertical Scroll',
    category: 'Comics',
    description: 'Optimized for mobile, long vertical format, digital painting.',
    promptSnippet: '**WORK SURFACE:** A vertical scrolling webtoon strip.\n**LAYOUT:** Single column, generous white space between panels for pacing.\n**STYLE:** Modern digital anime style, cel-shaded.',
    imageUrl: 'https://picsum.photos/seed/c5/800/600',
  },
  {
    id: 'c6',
    title: 'Underground Comix',
    category: 'Comics',
    description: 'Gritty, psychedelic, cross-hatching, 1960s counter-culture.',
    promptSnippet: '**WORK SURFACE:** A poster-style comic page.\n**STYLE:** Underground comix style (Crumb/Shelton), excessive cross-hatching, grotesque exaggeration, psychedelic distortion.',
    imageUrl: 'https://picsum.photos/seed/c6/800/600',
  },
  {
    id: 'c7',
    title: 'Graphic Novel Noir',
    category: 'Comics',
    description: 'High contrast chiaroscuro, Frank Miller style, splash of red.',
    promptSnippet: '**WORK SURFACE:** Full page splash panel.\n**STYLE:** Neo-noir, high contrast black and white with a single accent color (red), silhouette-heavy.',
    imageUrl: 'https://picsum.photos/seed/c7/800/600?grayscale',
  },
  {
    id: 'c8',
    title: 'Retro Sci-Fi Comic',
    category: 'Comics',
    description: '1950s pulp sci-fi, bubble helmets, rayguns, washed out colors.',
    promptSnippet: '**WORK SURFACE:** Comic book cover.\n**STYLE:** 1950s Pulp Sci-Fi, retro-futurism, matte painting background, distressed paper texture.',
    imageUrl: 'https://picsum.photos/seed/c8/800/600',
  },
  {
    id: 'c9',
    title: 'Shojo Manga',
    category: 'Comics',
    description: 'Delicate lines, floral backgrounds, sparkling eyes, emotional.',
    promptSnippet: '**WORK SURFACE:** Manga page.\n**STYLE:** Shojo aesthetic, flowery backgrounds, screentone textures, soft focus, delicate linework.',
    imageUrl: 'https://picsum.photos/seed/c9/800/600?grayscale',
  },
  {
    id: 'c10',
    title: 'Political Cartoon',
    category: 'Comics',
    description: 'Caricature, ink wash, cross-hatching, labeled objects.',
    promptSnippet: '**WORK SURFACE:** Single panel editorial cartoon.\n**STYLE:** Traditional ink cross-hatching, exaggerated caricature features, visual metaphors.',
    imageUrl: 'https://picsum.photos/seed/c10/800/600',
  },
  {
    id: 'c11',
    title: 'Horror Anthology',
    category: 'Comics',
    description: 'EC Comics style, heavy shadows, lurid colors, gothic.',
    promptSnippet: '**WORK SURFACE:** Comic page.\n**STYLE:** 1950s Horror Comic. Heavy black shadows, lurid purple and green color palette, gothic lettering.',
    imageUrl: 'https://picsum.photos/seed/c11/800/600',
  },
  {
    id: 'c12',
    title: 'Modern Superhero',
    category: 'Comics',
    description: 'Digital coloring, cinematic lighting, realistic anatomy.',
    promptSnippet: '**WORK SURFACE:** Double-page action spread.\n**STYLE:** Modern US Superhero. Digital coloring with gradients, lens flares, realistic anatomy, cinematic composition.',
    imageUrl: 'https://picsum.photos/seed/c12/800/600',
  },
  {
    id: 'c13',
    title: 'Indie Graphic Memoir',
    category: 'Comics',
    description: 'Minimalist ink, personal, loose lines, emotional.',
    promptSnippet: '**WORK SURFACE:** Graphic novel page.\n**STYLE:** Indie Memoir. Minimalist ink brushwork, plenty of white space, loose hand-drawn borders, intimate tone.',
    imageUrl: 'https://picsum.photos/seed/c13/800/600',
  },
  {
    id: 'c14',
    title: 'Steampunk Adventure',
    category: 'Comics',
    description: 'Brass gears, Victorian fashion, sepia tones, detailed.',
    promptSnippet: '**WORK SURFACE:** Full page illustration.\n**STYLE:** Steampunk. Victorian aesthetics, brass machinery, sepia and leather tones, intricate mechanical details.',
    imageUrl: 'https://picsum.photos/seed/c14/800/600',
  },
  {
    id: 'c15',
    title: 'Cyberpunk Manga',
    category: 'Comics',
    description: 'Tech-wear, neon city, cables, high detail Katsuhiro Otomo style.',
    promptSnippet: '**WORK SURFACE:** Manga city spread.\n**STYLE:** Cyberpunk Manga. Extremely detailed cityscapes, destruction, cables, tech-wear, high contrast inking.',
    imageUrl: 'https://picsum.photos/seed/c15/800/600',
  },

  // --- FINE ART & PAINTERLY ---
  {
    id: 'a1',
    title: 'Impressionist Oil',
    category: 'Fine Art',
    description: 'Visible brushstrokes, light emphasis, Monet/Renoir style.',
    promptSnippet: '**WORK SURFACE:** Oil painting on canvas.\n**STYLE:** Impressionism. Visible short brush strokes, focus on changing light, open composition, unblended color.',
    imageUrl: 'https://picsum.photos/seed/a1/800/600',
  },
  {
    id: 'a2',
    title: 'Surrealist Dream',
    category: 'Fine Art',
    description: 'Melting objects, dream logic, Dali/Magritte style.',
    promptSnippet: '**WORK SURFACE:** Surrealist oil painting.\n**STYLE:** Salvador Dali style. Dreamscape, melting objects, impossible physics, hyper-realistic rendering of unreal subjects.',
    imageUrl: 'https://picsum.photos/seed/a2/800/600',
  },
  {
    id: 'a3',
    title: 'Ukiyo-e Woodblock',
    category: 'Fine Art',
    description: 'Japanese woodblock print, flat perspective, Hokusai style.',
    promptSnippet: '**WORK SURFACE:** Woodblock print.\n**STYLE:** Ukiyo-e style. Flat perspective, bold outlines, gradient bokashi technique, nature themes.',
    imageUrl: 'https://picsum.photos/seed/a3/800/600',
  },
  {
    id: 'a4',
    title: 'Pop Art Screenprint',
    category: 'Fine Art',
    description: 'Repetition, vibrant neon colors, Warhol style.',
    promptSnippet: '**WORK SURFACE:** Silk screen print.\n**STYLE:** Pop Art (Warhol). High contrast, halftone dots, repetitive imagery, vibrant neon color blocks.',
    imageUrl: 'https://picsum.photos/seed/a4/800/600',
  },
  {
    id: 'a5',
    title: 'Art Nouveau',
    category: 'Fine Art',
    description: 'Organic lines, floral motifs, Mucha style.',
    promptSnippet: '**WORK SURFACE:** Decorative poster.\n**STYLE:** Art Nouveau (Mucha). Whiplash curves, organic floral motifs, stained glass outlines, pastel palette with gold leaf.',
    imageUrl: 'https://picsum.photos/seed/a5/800/600',
  },
  {
    id: 'a6',
    title: 'Cubist Fragmentation',
    category: 'Fine Art',
    description: 'Geometric shapes, multiple viewpoints, Picasso/Braque.',
    promptSnippet: '**WORK SURFACE:** Oil painting.\n**STYLE:** Analytical Cubism. Fragmented objects, multiple viewpoints simultaneously, geometric deconstruction, muted browns and greys.',
    imageUrl: 'https://picsum.photos/seed/a6/800/600',
  },
  {
    id: 'a7',
    title: 'Bauhaus Design',
    category: 'Fine Art',
    description: 'Minimalist, geometric, primary colors, form follows function.',
    promptSnippet: '**WORK SURFACE:** Exhibition poster.\n**STYLE:** Bauhaus. Geometric abstraction, sans-serif typography, diagonals, red/blue/yellow/black palette.',
    imageUrl: 'https://picsum.photos/seed/a7/800/600',
  },
  {
    id: 'a8',
    title: 'Watercolor Landscape',
    category: 'Fine Art',
    description: 'Wet-on-wet, transparent layers, paper texture.',
    promptSnippet: '**WORK SURFACE:** Watercolor paper.\n**STYLE:** Loose watercolor. Wet-on-wet technique, pigment bleeding, negative space, rough paper grain visibility.',
    imageUrl: 'https://picsum.photos/seed/a8/800/600',
  },
  {
    id: 'a9',
    title: 'Renaissance Portrait',
    category: 'Fine Art',
    description: 'Sfumato, chiaroscuro, anatomical precision, Da Vinci style.',
    promptSnippet: '**WORK SURFACE:** Oil on wood panel.\n**STYLE:** High Renaissance. Sfumato blending, pyramid composition, dramatic chiaroscuro, atmospheric perspective.',
    imageUrl: 'https://picsum.photos/seed/a9/800/600',
  },
  {
    id: 'a10',
    title: 'Street Art Graffiti',
    category: 'Fine Art',
    description: 'Spray paint, stencils, urban texture, Banksy/Basquiat.',
    promptSnippet: '**WORK SURFACE:** Concrete wall.\n**STYLE:** Neo-expressionist street art. Spray paint texture, drips, stencils, bold scrawled text, urban decay aesthetic.',
    imageUrl: 'https://picsum.photos/seed/a10/800/600',
  },
  {
    id: 'a11',
    title: 'Pointillism',
    category: 'Fine Art',
    description: 'Dots of pure color, Seurat style, optical mixing.',
    promptSnippet: '**WORK SURFACE:** Canvas.\n**STYLE:** Pointillism. Image composed entirely of small distinct dots of pure color, optical blending, luminous effect.',
    imageUrl: 'https://picsum.photos/seed/a11/800/600',
  },
  {
    id: 'a12',
    title: 'Fauvism',
    category: 'Fine Art',
    description: 'Wild brush work, strident colors, Matisse style.',
    promptSnippet: '**WORK SURFACE:** Oil painting.\n**STYLE:** Fauvism. Wild brush work, strong unnatural colors, painterly qualities over realistic values.',
    imageUrl: 'https://picsum.photos/seed/a12/800/600',
  },
  {
    id: 'a13',
    title: 'Abstract Expressionism',
    category: 'Fine Art',
    description: 'Action painting, drips, chaos, Pollock style.',
    promptSnippet: '**WORK SURFACE:** Large canvas.\n**STYLE:** Abstract Expressionism. Action painting, drips, splatters, non-representational, emotional intensity.',
    imageUrl: 'https://picsum.photos/seed/a13/800/600',
  },
  {
    id: 'a14',
    title: 'Baroque Dramatic',
    category: 'Fine Art',
    description: 'Deep shadows, intense emotion, Caravaggio style.',
    promptSnippet: '**WORK SURFACE:** Oil on canvas.\n**STYLE:** Baroque. Tenebrism (extreme light/dark contrast), dynamic movement, intense emotional expression.',
    imageUrl: 'https://picsum.photos/seed/a14/800/600',
  },
  {
    id: 'a15',
    title: 'Pre-Raphaelite',
    category: 'Fine Art',
    description: 'Detailed nature, romance, vivid colors, Millais/Rossetti.',
    promptSnippet: '**WORK SURFACE:** Oil painting.\n**STYLE:** Pre-Raphaelite. Intense attention to natural detail, romantic medieval subjects, vivid jewel-tone colors.',
    imageUrl: 'https://picsum.photos/seed/a15/800/600',
  },

  // --- EDUCATIONAL & DIAGRAMS ---
  {
    id: 'e1',
    title: 'Anatomical Cutaway',
    category: 'Educational',
    description: 'Medical illustration, layered transparency, labels.',
    promptSnippet: '**WORK SURFACE:** Medical illustration plate.\n**STYLE:** Realistic anatomical rendering. Cutaway view showing internal layers, clean leader lines, labels.',
    imageUrl: 'https://picsum.photos/seed/e1/800/600',
  },
  {
    id: 'e2',
    title: 'Botanical Illustration',
    category: 'Educational',
    description: 'Scientific accuracy, isolated on white, vintage style.',
    promptSnippet: '**WORK SURFACE:** Vintage botanical plate.\n**STYLE:** Scientific illustration. Watercolor and ink, isolated on white, showing life cycle stages, highly detailed.',
    imageUrl: 'https://picsum.photos/seed/e2/800/600',
  },
  {
    id: 'e3',
    title: 'Technical Blueprint',
    category: 'Educational',
    description: 'White lines on blue, orthographic projection, measurements.',
    promptSnippet: '**WORK SURFACE:** Engineering blueprint.\n**STYLE:** Cyanotype style. White lines on blue background, orthographic projection, dimension lines, technical annotations.',
    imageUrl: 'https://picsum.photos/seed/e3/800/600',
  },
  {
    id: 'e4',
    title: 'Isometric Infographic',
    category: 'Educational',
    description: '3D vector style, clean gradients, floating elements.',
    promptSnippet: '**WORK SURFACE:** Isometric infographic.\n**STYLE:** Modern vector 3D. Clean gradients, soft shadows, floating elements, consistent isometric angle.',
    imageUrl: 'https://picsum.photos/seed/e4/800/600',
  },
  {
    id: 'e5',
    title: 'Knolling Photography',
    category: 'Educational',
    description: 'Overhead shot, items arranged at 90 degrees, organized.',
    promptSnippet: '**WORK SURFACE:** Overhead photography.\n**STYLE:** Knolling (Flat Lay). Objects arranged in parallel or 90-degree angles, organized by size/color, clean background.',
    imageUrl: 'https://picsum.photos/seed/e5/800/600',
  },
  {
    id: 'e6',
    title: 'Ikea Assembly Art',
    category: 'Educational',
    description: 'Line art, no text, helpful man character, steps.',
    promptSnippet: '**WORK SURFACE:** Instruction manual step.\n**STYLE:** Minimalist line art. Thick rounded outlines, no shading, isometric perspective, neutral expression characters.',
    imageUrl: 'https://picsum.photos/seed/e6/800/600',
  },
  {
    id: 'e7',
    title: 'Vintage Map',
    category: 'Educational',
    description: 'Parchment texture, compass rose, sea monsters.',
    promptSnippet: '**WORK SURFACE:** Cartographic map.\n**STYLE:** 17th Century Cartography. Parchment texture, hand-drawn coastlines, compass rose, sea monsters, calligraphy labels.',
    imageUrl: 'https://picsum.photos/seed/e7/800/600',
  },
  {
    id: 'e8',
    title: 'Exploded View',
    category: 'Educational',
    description: 'Parts separated in space to show assembly, technical.',
    promptSnippet: '**WORK SURFACE:** Technical diagram.\n**STYLE:** Exploded view. Components separated along a central axis, dotted guide lines, mechanical shading.',
    imageUrl: 'https://picsum.photos/seed/e8/800/600',
  },
  {
    id: 'e9',
    title: 'Cross-Section',
    category: 'Educational',
    description: 'Sliced view of building or object, "Look Inside" style.',
    promptSnippet: '**WORK SURFACE:** Cross-section illustration.\n**STYLE:** Stephen Biesty style. "Slice of life" cutaway, busy details, tiny characters interacting with the interior.',
    imageUrl: 'https://picsum.photos/seed/e9/800/600',
  },
  {
    id: 'e10',
    title: 'Periodic Table Chart',
    category: 'Educational',
    description: 'Grid layout, color coded, scientific typography.',
    promptSnippet: '**WORK SURFACE:** Scientific chart.\n**LAYOUT:** Strict tabular grid.\n**STYLE:** Clean modern typography, color-coded categories, chemical symbols.',
    imageUrl: 'https://picsum.photos/seed/e10/800/600',
  },
  {
    id: 'e11',
    title: 'Transit Map',
    category: 'Educational',
    description: 'Colored lines, nodes, abstract geography, Harry Beck style.',
    promptSnippet: '**WORK SURFACE:** Transit system map.\n**STYLE:** Tube Map style. 45-degree angles only, bright color-coded lines, distinct station nodes, abstract geography.',
    imageUrl: 'https://picsum.photos/seed/e11/800/600',
  },
  {
    id: 'e12',
    title: 'Architectural Sketch',
    category: 'Educational',
    description: 'Pencil lines, markers, perspective construction lines.',
    promptSnippet: '**WORK SURFACE:** Architectural concept sketch.\n**STYLE:** Marker and loose pencil. Visible construction lines, perspective vanishing points, human scale figures.',
    imageUrl: 'https://picsum.photos/seed/e12/800/600',
  },
  {
    id: 'e13',
    title: 'Taxonomy Chart',
    category: 'Educational',
    description: 'Grid of species, scientific names, detailed illustrations.',
    promptSnippet: '**WORK SURFACE:** Educational poster.\n**LAYOUT:** Grid of species.\n**STYLE:** Encyclopedia plate. Realistic illustrations of insects/birds, latin labels.',
    imageUrl: 'https://picsum.photos/seed/e13/800/600',
  },
  {
    id: 'e14',
    title: 'Patent Drawing',
    category: 'Educational',
    description: 'Black ink, stippling, reference numbers, formal.',
    promptSnippet: '**WORK SURFACE:** US Patent Document.\n**STYLE:** Patent illustration. Black ink on white, stippling for shading, numbered reference parts, formal line work.',
    imageUrl: 'https://picsum.photos/seed/e14/800/600',
  },
  {
    id: 'e15',
    title: 'Courtroom Sketch',
    category: 'Educational',
    description: 'Pastel, quick gestures, capturing likeness and mood.',
    promptSnippet: '**WORK SURFACE:** Courtroom sketch.\n**STYLE:** Pastel on toned paper. Quick gestural lines, focus on facial expressions and body language.',
    imageUrl: 'https://picsum.photos/seed/e15/800/600',
  },

  // --- 3D & CRAFT ---
  {
    id: 'd1',
    title: 'Claymation (Aardman)',
    category: '3D & Craft',
    description: 'Plasticine texture, fingerprints visible, goofy eyes.',
    promptSnippet: '**WORK SURFACE:** Stop-motion still.\n**STYLE:** Claymation / Aardman style. Plasticine texture, visible fingerprints, rounded forms, wide eyes, shallow depth of field.',
    imageUrl: 'https://picsum.photos/seed/d1/800/600',
  },
  {
    id: 'd2',
    title: 'Paper Cutout (Diorama)',
    category: '3D & Craft',
    description: 'Layered paper, depth shadows, craft aesthetic.',
    promptSnippet: '**WORK SURFACE:** Papercraft illustration.\n**STYLE:** Layered paper cutout. Deep shadows between layers, paper grain texture, vibrant colors, diorama effect.',
    imageUrl: 'https://picsum.photos/seed/d2/800/600',
  },
  {
    id: 'd3',
    title: 'Low Poly Isometric',
    category: '3D & Craft',
    description: 'Video game style, flat shading, geometric triangles.',
    promptSnippet: '**WORK SURFACE:** 3D Render.\n**STYLE:** Low Poly art. Visible triangular mesh, flat shading, pastel color palette, isometric camera view.',
    imageUrl: 'https://picsum.photos/seed/d3/800/600',
  },
  {
    id: 'd4',
    title: 'Voxel Art (Minecraft)',
    category: '3D & Craft',
    description: 'Cubes only, pixelated textures, blocky.',
    promptSnippet: '**WORK SURFACE:** 3D Voxel render.\n**STYLE:** Voxel art. Everything made of cubes, orthographic projection, tilt-shift effect, MagicaVoxel aesthetic.',
    imageUrl: 'https://picsum.photos/seed/d4/800/600',
  },
  {
    id: 'd5',
    title: 'Felt / Wool',
    category: '3D & Craft',
    description: 'Fuzzy texture, needle felting style, soft edges.',
    promptSnippet: '**WORK SURFACE:** Macro photography of craft.\n**STYLE:** Needle felting. Fuzzy wool texture, stray fibers, soft shapes, warm lighting.',
    imageUrl: 'https://picsum.photos/seed/d5/800/600',
  },
  {
    id: 'd6',
    title: 'Origami',
    category: '3D & Craft',
    description: 'Folded paper, geometric creases, sharp edges.',
    promptSnippet: '**WORK SURFACE:** Product photography.\n**STYLE:** Origami. Folded paper construction, crisp creases, geometric abstraction, single sheet constraint.',
    imageUrl: 'https://picsum.photos/seed/d6/800/600',
  },
  {
    id: 'd7',
    title: 'Lego / Brick',
    category: '3D & Craft',
    description: 'Plastic bricks, studs visible, glossy plastic.',
    promptSnippet: '**WORK SURFACE:** Macro toy photography.\n**STYLE:** Brick construction. Plastic gloss, visible studs, articulated minifigures, depth of field.',
    imageUrl: 'https://picsum.photos/seed/d7/800/600',
  },
  {
    id: 'd8',
    title: 'Neon Glass Blowing',
    category: '3D & Craft',
    description: 'Glowing tubes, transparency, dark background.',
    promptSnippet: '**WORK SURFACE:** Dark room photography.\n**STYLE:** Neon glass art. Glowing gas tubes, glass transparency, reflections, dark cinematic background.',
    imageUrl: 'https://picsum.photos/seed/d8/800/600',
  },
  {
    id: 'd9',
    title: 'Embroidery / Cross Stitch',
    category: '3D & Craft',
    description: 'Thread texture, fabric weave, stitched patterns.',
    promptSnippet: '**WORK SURFACE:** Textile close-up.\n**STYLE:** Embroidery. Visible thread texture, fabric weave background, satin stitch volume.',
    imageUrl: 'https://picsum.photos/seed/d9/800/600',
  },
  {
    id: 'd10',
    title: 'Ceramic / Porcelain',
    category: '3D & Craft',
    description: 'Glazed surface, cracks, painted patterns, fragile.',
    promptSnippet: '**WORK SURFACE:** Studio pottery shot.\n**STYLE:** Blue and white porcelain. Glossy glaze, kintsugi gold cracks, hand-painted cobalt patterns.',
    imageUrl: 'https://picsum.photos/seed/d10/800/600',
  },
  {
    id: 'd11',
    title: 'Quilling Paper Art',
    category: '3D & Craft',
    description: 'Rolled paper strips, intricate spirals, edge-on view.',
    promptSnippet: '**WORK SURFACE:** Macro paper art.\n**STYLE:** Quilling. Coiled strips of colorful paper, edge-on arrangement, intricate spirals, shadow depth.',
    imageUrl: 'https://picsum.photos/seed/d11/800/600',
  },
  {
    id: 'd12',
    title: 'Ice Carving',
    category: '3D & Craft',
    description: 'Transparent, refractive, cold lighting, melting drips.',
    promptSnippet: '**WORK SURFACE:** Winter festival photo.\n**STYLE:** Ice sculpture. High transparency, light refraction, cold blue LED lighting, smooth melting edges.',
    imageUrl: 'https://picsum.photos/seed/d12/800/600',
  },
  {
    id: 'd13',
    title: 'Wood Carving',
    category: '3D & Craft',
    description: 'Grain texture, chisel marks, warm varnish.',
    promptSnippet: '**WORK SURFACE:** Studio shot.\n**STYLE:** Hand-carved wood. Visible grain direction, chisel tool marks, warm oak varnish, rustic feel.',
    imageUrl: 'https://picsum.photos/seed/d13/800/600',
  },
  {
    id: 'd14',
    title: 'Amigurumi Crochet',
    category: '3D & Craft',
    description: 'Knitted loops, cute proportions, yarn texture.',
    promptSnippet: '**WORK SURFACE:** Macro shot.\n**STYLE:** Amigurumi crochet. Visible yarn loops, cute chibi proportions, button eyes, soft fuzz.',
    imageUrl: 'https://picsum.photos/seed/d14/800/600',
  },
  {
    id: 'd15',
    title: 'Stained Glass',
    category: '3D & Craft',
    description: 'Lead cames, colored light transmission, glowing.',
    promptSnippet: '**WORK SURFACE:** Window design.\n**STYLE:** Stained Glass. Black lead outlines (cames), vibrant translucent glass sections, light transmission glow.',
    imageUrl: 'https://picsum.photos/seed/d15/800/600',
  },

  // --- UI & DESIGN ---
  {
    id: 'u1',
    title: 'SaaS Dashboard',
    category: 'Design & UI',
    description: 'Clean data visualization, charts, KPIs, grid layout.',
    promptSnippet: '**WORK SURFACE:** Dashboard UI.\n**LAYOUT:** 3-column grid.\n**COMPONENTS:** Line chart, KPI cards, sidebar navigation, user profile.',
    imageUrl: 'https://picsum.photos/seed/u1/800/600',
  },
  {
    id: 'u2',
    title: 'Neomorphism',
    category: 'Design & UI',
    description: 'Soft shadows, low contrast, plastic look, extruded shapes.',
    promptSnippet: '**WORK SURFACE:** Mobile app UI.\n**STYLE:** Neomorphism. Soft shadows, off-white background, low contrast, elements appear extruded from surface.',
    imageUrl: 'https://picsum.photos/seed/u2/800/600',
  },
  {
    id: 'u3',
    title: 'Glassmorphism',
    category: 'Design & UI',
    description: 'Frosted glass, transparency, background blur, vivid colors.',
    promptSnippet: '**WORK SURFACE:** UI Card component.\n**STYLE:** Glassmorphism. Frosted glass effect, background blur, white transparency, vivid background orbs.',
    imageUrl: 'https://picsum.photos/seed/u3/800/600',
  },
  {
    id: 'u4',
    title: 'Retro 90s OS',
    category: 'Design & UI',
    description: 'Windows 95 style, bevels, grey backgrounds, pixel fonts.',
    promptSnippet: '**WORK SURFACE:** Desktop OS Screenshot.\n**STYLE:** Windows 95 aesthetic. Beveled buttons, grey background, Chicago 12pt font, pixelated icons.',
    imageUrl: 'https://picsum.photos/seed/u4/800/600',
  },
  {
    id: 'u5',
    title: 'Cyberpunk HUD',
    category: 'Design & UI',
    description: 'Neon wireframes, data streams, holographic, dark.',
    promptSnippet: '**WORK SURFACE:** Heads Up Display (HUD).\n**STYLE:** Cyberpunk interface. Neon blue/pink data streams, wireframe terrain, glitch effects, dark background.',
    imageUrl: 'https://picsum.photos/seed/u5/800/600',
  },
  {
    id: 'u6',
    title: 'Swiss Style Poster',
    category: 'Design & UI',
    description: 'Grid systems, sans-serif, asymmetry, negative space.',
    promptSnippet: '**WORK SURFACE:** Typographic poster.\n**STYLE:** International Typographic Style (Swiss). Grid-based layout, asymmetry, Helvetica font, negative space.',
    imageUrl: 'https://picsum.photos/seed/u6/800/600',
  },
  {
    id: 'u7',
    title: 'App Store Screenshot',
    category: 'Design & UI',
    description: 'Device frame, marketing copy, tilted perspective.',
    promptSnippet: '**WORK SURFACE:** App Store marketing image.\n**STYLE:** Product showcase. Floating iPhone 15 Pro frame, tilted perspective, vibrant background gradient, marketing tagline.',
    imageUrl: 'https://picsum.photos/seed/u7/800/600',
  },
  {
    id: 'u8',
    title: 'Game Inventory',
    category: 'Design & UI',
    description: 'RPG style, grid slots, item tooltips, fantasy frame.',
    promptSnippet: '**WORK SURFACE:** RPG Inventory Screen.\n**STYLE:** Fantasy UI. Parchment texture background, gold filigree borders, grid of item icons, stat bars.',
    imageUrl: 'https://picsum.photos/seed/u8/800/600',
  },
  {
    id: 'u9',
    title: 'Vector Logo',
    category: 'Design & UI',
    description: 'Flat, scalable, minimal, negative space logo.',
    promptSnippet: '**WORK SURFACE:** Brand Logo.\n**STYLE:** Flat Vector. Minimalist, negative space utilization, solid colors, geometric construction.',
    imageUrl: 'https://picsum.photos/seed/u9/800/600',
  },
  {
    id: 'u10',
    title: 'Retro Calligram',
    category: 'Design & UI',
    description: 'Text forming image, 70s psychedelic, fluid type.',
    promptSnippet: '**WORK SURFACE:** Typographic Illustration.\n**STYLE:** 70s Calligram. Text warped to form a silhouette, psychedelic colors, fluid typography.',
    imageUrl: 'https://picsum.photos/seed/u10/800/600',
  },
  {
    id: 'u11',
    title: 'Brutalist Web Design',
    category: 'Design & UI',
    description: 'Raw, unstyled HTML look, web-safe fonts, high contrast.',
    promptSnippet: '**WORK SURFACE:** Webpage mockup.\n**STYLE:** Digital Brutalism. Default blue links, raw courier font, high contrast borders, overlapping elements, intentionally ugly.',
    imageUrl: 'https://picsum.photos/seed/u11/800/600',
  },
  {
    id: 'u12',
    title: 'Skeuomorphism',
    category: 'Design & UI',
    description: 'Leather, wood, stitched textures, realistic materials.',
    promptSnippet: '**WORK SURFACE:** iOS 6 App Icon.\n**STYLE:** Skeuomorphism. Leather texture with stitching, glossy glass overlay, rich realistic material rendering.',
    imageUrl: 'https://picsum.photos/seed/u12/800/600',
  },
  {
    id: 'u13',
    title: 'Data Viz Dark Mode',
    category: 'Design & UI',
    description: 'Dark background, neon data lines, sleek modern.',
    promptSnippet: '**WORK SURFACE:** Fintech Dashboard.\n**STYLE:** Dark Mode Data Viz. Deep charcoal background, neon green/purple graph lines, glowing nodes, sleek sans-serif.',
    imageUrl: 'https://picsum.photos/seed/u13/800/600',
  },
  {
    id: 'u14',
    title: 'Risograph Print',
    category: 'Design & UI',
    description: 'Grainy texture, misaligned layers, limited color palette.',
    promptSnippet: '**WORK SURFACE:** Zine cover.\n**STYLE:** Risograph. Grainy dithering texture, slight layer misalignment, fluorescent pink and blue ink overlap.',
    imageUrl: 'https://picsum.photos/seed/u14/800/600',
  },
  {
    id: 'u15',
    title: 'Corporate Memphis',
    category: 'Design & UI',
    description: 'Flat, big limbs, pastel colors, tech startup style.',
    promptSnippet: '**WORK SURFACE:** Landing page illustration.\n**STYLE:** Corporate Memphis (Big Tech Art). Flat vector, exaggerated limb proportions, pastel colors, joyful diversity.',
    imageUrl: 'https://picsum.photos/seed/u15/800/600',
  },

  // --- PHOTOGRAPHY & REALISM ---
  {
    id: 'p1',
    title: 'Cinematic Wide Shot',
    category: 'Photography',
    description: 'Anamorphic lens, film grain, teal & orange, dramatic.',
    promptSnippet: '**WORK SURFACE:** Movie Still.\n**STYLE:** Cinematic. Anamorphic lens flares, aspect ratio 2.39:1, teal and orange color grading, dramatic lighting.',
    imageUrl: 'https://picsum.photos/seed/p1/800/600',
  },
  {
    id: 'p2',
    title: 'Macro Insect',
    category: 'Photography',
    description: 'Extreme close up, compound eyes, shallow depth of field.',
    promptSnippet: '**WORK SURFACE:** Macro Photography.\n**STYLE:** Nature Macro. 1:1 magnification, extreme detail on textures, shallow depth of field (bokeh), diffused lighting.',
    imageUrl: 'https://picsum.photos/seed/p2/800/600',
  },
  {
    id: 'p3',
    title: 'Studio Portrait',
    category: 'Photography',
    description: 'Rembrandt lighting, sharp focus, neutral background.',
    promptSnippet: '**WORK SURFACE:** Headshot.\n**STYLE:** Studio Portrait. Rembrandt lighting setup, 85mm lens, sharp focus on eyes, neutral grey backdrop.',
    imageUrl: 'https://picsum.photos/seed/p3/800/600',
  },
  {
    id: 'p4',
    title: 'Drone Aerial',
    category: 'Photography',
    description: 'Top-down view, geometric patterns of landscape.',
    promptSnippet: '**WORK SURFACE:** Aerial Photography.\n**STYLE:** Drone shot. Top-down 90-degree angle, geometric patterns in landscape, high altitude.',
    imageUrl: 'https://picsum.photos/seed/p4/800/600',
  },
  {
    id: 'p5',
    title: 'Double Exposure',
    category: 'Photography',
    description: 'Silhouette filled with another image, dreamy.',
    promptSnippet: '**WORK SURFACE:** Artistic Photograph.\n**STYLE:** Double Exposure. Silhouette of a person filled with a forest landscape, white background, dreamy atmosphere.',
    imageUrl: 'https://picsum.photos/seed/p5/800/600',
  },
  {
    id: 'p6',
    title: 'Tilt-Shift (Miniature)',
    category: 'Photography',
    description: 'Blur top/bottom, looks like toys, high saturation.',
    promptSnippet: '**WORK SURFACE:** Cityscape photo.\n**STYLE:** Tilt-Shift. Selective focus plane, blurred top and bottom, high saturation, "miniature world" effect.',
    imageUrl: 'https://picsum.photos/seed/p6/800/600',
  },
  {
    id: 'p7',
    title: 'Product Editorial',
    category: 'Photography',
    description: 'Floating product, hard shadows, pastel background.',
    promptSnippet: '**WORK SURFACE:** Advertising photography.\n**STYLE:** Modern Product. Hard light, long shadows, pastel monochrome background, levitating objects.',
    imageUrl: 'https://picsum.photos/seed/p7/800/600',
  },
  {
    id: 'p8',
    title: 'Analog Film (Polaroid)',
    category: 'Photography',
    description: 'Light leaks, vintage border, soft focus, nostalgia.',
    promptSnippet: '**WORK SURFACE:** Polaroid photo.\n**STYLE:** Analog film. Light leaks, dust and scratches, soft focus, vintage color cast, white frame border.',
    imageUrl: 'https://picsum.photos/seed/p8/800/600',
  },
  {
    id: 'p9',
    title: 'Underwater',
    category: 'Photography',
    description: 'Refracted light, caustic patterns, bubbles, blue.',
    promptSnippet: '**WORK SURFACE:** Underwater shot.\n**STYLE:** Subaquatic. Refracted sunlight (caustics), floating particles/bubbles, deep blue gradient.',
    imageUrl: 'https://picsum.photos/seed/p9/800/600',
  },
  {
    id: 'p10',
    title: 'Thermal Imaging',
    category: 'Photography',
    description: 'Heat map colors, predator vision, high contrast.',
    promptSnippet: '**WORK SURFACE:** Surveillance footage.\n**STYLE:** Thermal Camera. Heat map color palette (blue cold, red/white hot), grainy texture, high contrast.',
    imageUrl: 'https://picsum.photos/seed/p10/800/600',
  },
  {
    id: 'p11',
    title: 'Food Photography',
    category: 'Photography',
    description: 'Mouth-watering, steam, selective focus, high vibrance.',
    promptSnippet: '**WORK SURFACE:** Restaurant menu shot.\n**STYLE:** Commercial Food Photography. Steam rising, glistening oil, fresh ingredients, bokeh background, warm lighting.',
    imageUrl: 'https://picsum.photos/seed/p11/800/600',
  },
  {
    id: 'p12',
    title: 'Long Exposure Light Trails',
    category: 'Photography',
    description: 'City night, car lights as streaks, smooth water.',
    promptSnippet: '**WORK SURFACE:** Night city photo.\n**STYLE:** Long Exposure. Light trails from cars, smooth silky water, starburst streetlights, tripod stability.',
    imageUrl: 'https://picsum.photos/seed/p12/800/600',
  },
  {
    id: 'p13',
    title: 'Infrared Photography',
    category: 'Photography',
    description: 'Surreal colors, white foliage, dark sky (Aerochrome).',
    promptSnippet: '**WORK SURFACE:** Landscape photo.\n**STYLE:** Kodak Aerochrome Infrared. Foliage turns hot pink/red, sky turns deep dark blue, surreal dreamlike atmosphere.',
    imageUrl: 'https://picsum.photos/seed/p13/800/600',
  },
  {
    id: 'p14',
    title: 'Sports Action (Freeze Frame)',
    category: 'Photography',
    description: 'High shutter speed, frozen motion, intensity.',
    promptSnippet: '**WORK SURFACE:** Sports photography.\n**STYLE:** High shutter speed. Frozen motion (water droplets/sweat), tense muscles, blurred stadium background.',
    imageUrl: 'https://picsum.photos/seed/p14/800/600',
  },
  {
    id: 'p15',
    title: 'Architectural Brutalism',
    category: 'Photography',
    description: 'Raw concrete, massive forms, monochromatic, imposing.',
    promptSnippet: '**WORK SURFACE:** Architectural photo.\n**STYLE:** Brutalism. Raw concrete textures, massive geometric forms, monochromatic grey, imposing scale.',
    imageUrl: 'https://picsum.photos/seed/p15/800/600',
  },
];