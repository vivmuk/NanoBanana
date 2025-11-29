import { GalleryItem } from './types';

export const SYSTEM_INSTRUCTION = `
You are the "Nano Banana Architect", an expert Prompt Engineer specialized in visual reasoning and in building structured prompts for the generative model "Nano Banana Pro".

<context>
Nano Banana Pro is a **visual reasoning system** built on multiple engines:
- **Layout Engine** – Handles grids, columns, visual hierarchy (dashboards, infographics, UX flows)
- **Diagram Engine** – Turns logical structures into diagrams with nodes, connectors, and labels
- **Typography Engine** – Renders sharp, readable text with headings, hierarchy, and formatting
- **Data Visualization Engine** – Converts numbers into charts, KPIs, indicators, and dashboards
- **Style Universe Engine** – Maintains consistent style, palette, linework, and lighting
- **Brand & Identity Engine** – Detects and applies logos, brand colors, and visual identity
- **Representation Transformer Engine** – Switches surfaces (blueprint → infographic → storyboard)

**Core Prompting Principles:**
1. **Start with the Work Surface** – Define the canvas (e.g., "A 6-panel storyboard", "A comparative infographic", "A dashboard with KPIs")
2. **Layout First, Style Second** – Define structure before aesthetics: panels/sections/columns, reading flow, where elements go
3. **List All Components Explicitly** – Lists activate the engines: "title block, two bar charts, one line chart, legend, icons"
4. **Add Clear Constraints** – Rules reduce chaos: "No overlapping labels", "Uniform spacing", "Text must remain sharp"
</context>

<task>
When the user describes what they want to create, IMMEDIATELY generate a complete, professional prompt following the 8-area structure. Do NOT ask questions. Use the user's description to intelligently fill in all 8 areas:

1. **WORK SURFACE** – Define the medium precisely (format, dimensions, orientation)
2. **LAYOUT** – Describe structure and flow (panels/sections, grid, reading direction, element placement)
3. **COMPONENTS** – List specific items to include (bullet points activating recognition engines)
4. **STYLE** – Art style, palette, era, realism level, visual references, mood
5. **CONSTRAINTS** – Rules about spacing, overlaps, consistency, text, colors, etc.
6. **SOURCE MATERIAL** – Any text, data, copy, story, or requirements
7. **INTERPRETATION** – How to treat ambiguity: what to emphasize, emotional tone, priorities

Generate the prompt immediately in a single response. If information is missing, make intelligent assumptions based on best practices.
</task>

<output_format>
The prompt MUST be contained in a Markdown code block and follow EXACTLY this structure:

\`\`\`markdown
[PROMPT START]
**WORK SURFACE:** [precise definition with format and dimensions]
**LAYOUT:** [composition instructions with structure and flow]
**COMPONENTS:**
• [Component 1]
• [Component 2]
• [Component 3]
• [etc.]

**STYLE:** [aesthetic definition with style, palette, era, mood]
**CONSTRAINTS:**
• [Constraint 1]
• [Constraint 2]
• [Constraint 3]
• [etc.]

**SOURCE MATERIAL:** [context, data, or requirements]
**INTERPRETATION:** [instructions for ambiguous input - what to emphasize, tone, priorities]
[PROMPT END]
\`\`\`

Be comprehensive and detailed. Fill in all areas based on the user's description.
</output_format>

<tone>
Professional, direct, efficient. Generate the prompt immediately without asking questions.
</tone>
`;

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- COMICS & MANGA ---
  {
    id: 'c1',
    title: 'French Noir Comic',
    category: 'Comics',
    description: '1970s European style, heavy ink, muted tones.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A 3-panel comic page in 1970s French noir style.

**LAYOUT:** Horizontal strip layout with three equal panels. Left-to-right reading flow. Each panel maintains consistent gutter spacing (approximately 1cm between panels). Panels are rectangular with slightly rounded corners.

**COMPONENTS:**
• Panel 1: Establishing shot with character silhouette
• Panel 2: Medium shot with character interaction
• Panel 3: Close-up emotional moment
• Speech balloons positioned above characters
• Sound effects integrated into composition
• Background elements suggesting urban noir atmosphere
• Consistent character design across all panels

**STYLE:** 1970s French noir aesthetic. Muted color palette (grays, browns, desaturated blues). Heavy ink linework with varied line weights. Atmospheric lighting with strong shadows. Film noir influence with high contrast. European comic book tradition (Moebius, Tardi style).

**CONSTRAINTS:**
• No overlapping text or speech balloons
• Uniform spacing between panels
• Character design must remain identical across all three panels
• Text must remain sharp and readable at small sizes
• Maintain consistent lighting direction throughout
• No bright colors - keep palette muted and atmospheric

**SOURCE MATERIAL:** French noir comic tradition, 1970s European graphic novel aesthetic, urban detective stories.

**INTERPRETATION:** Emphasize mood and atmosphere over action. Prioritize visual storytelling through composition and lighting. If ambiguous, favor subtlety and emotional depth over explicit narrative.
[PROMPT END]`,
    imageUrl: '/style-previews/c1.webp',
  },
  {
    id: 'c2',
    title: 'Silver Age Superhero',
    category: 'Comics',
    description: 'Bright primary colors, dynamic Kirby dots, 4-color process.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Vintage Silver Age comic book cover (US standard format, approximately 6.625" x 10.25").

**LAYOUT:** Central hero figure in dynamic action pose. Floating villain heads arranged in upper third. Title logo at top center. Issue number and price in corner. Background elements supporting the main composition. All elements arranged to create visual hierarchy with hero as focal point.

**COMPONENTS:**
• Central hero in dynamic action pose (flying, punching, or power pose)
• Three to five floating villain heads in upper portion
• Bold title logo at top
• Issue number and price in corner
• Background elements (cityscape, energy effects, or dramatic environment)
• "Kirby dots" (energy crackle effects) around hero
• Speech bubble or dramatic text overlay
• Publisher logo placement

**STYLE:** Silver Age aesthetics (1950s-1970s). Jack Kirby inspired dynamic energy. Bold primary colors (red, blue, yellow) with 4-color process printing. Half-tone dot patterns for shading. Exaggerated anatomy and poses. Bright, optimistic color palette. Classic comic book lettering style.

**CONSTRAINTS:**
• No overlapping text elements
• Maintain clear visual hierarchy with hero as center
• All text must be readable at cover size
• Consistent character design for hero and villains
• Preserve classic comic book proportions
• Use only primary colors plus black and white
• No modern digital effects - maintain vintage print aesthetic

**SOURCE MATERIAL:** Silver Age comic book covers (Marvel, DC, 1950s-1970s), Jack Kirby artwork, classic superhero iconography.

**INTERPRETATION:** Emphasize energy, action, and heroism. Prioritize dynamic composition over realism. If ambiguous, favor classic superhero tropes and optimistic tone.
[PROMPT END]`,
    imageUrl: '/style-previews/c2.webp',
  },
  {
    id: 'c3',
    title: 'Shonen Manga Action',
    category: 'Comics',
    description: 'High contrast black & white, speed lines, dramatic angles.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A double-page manga spread (Japanese B5 format, approximately 7.2" x 10.1" per page, 14.4" total width).

**LAYOUT:** Dynamic diagonal paneling across both pages. Large action panel spanning center gutter. Smaller reaction panels in corners. Speed lines and impact effects integrated into panel borders. Reading flow: top-left to bottom-right with diagonal emphasis. Gutter spacing varies for dramatic pacing.

**COMPONENTS:**
• Large central action panel with character in dynamic pose
• Speed lines radiating from action
• Impact effects (dust clouds, debris, energy bursts)
• Reaction panels showing character expressions
• Sound effects (onomatopoeia) integrated into composition
• Background elements suggesting motion and impact
• Screentone patterns for shading and texture
• Character design consistent across all panels

**STYLE:** Shonen Jump style (Dragon Ball, One Piece, Naruto tradition). High contrast black and white. Heavy use of speed lines and motion effects. Dramatic camera angles (low angle, bird's eye, Dutch tilt). Bold inking with varied line weights. Screentone textures for depth. Energetic, action-focused aesthetic.

**CONSTRAINTS:**
• No overlapping text or sound effects
• Maintain character consistency across all panels
• Speed lines must follow motion direction logically
• High contrast - pure black and white only (no grays except screentone)
• Text must remain readable despite dynamic composition
• Panel borders can be broken for dramatic effect
• Maintain reading flow despite diagonal layout

**SOURCE MATERIAL:** Shonen manga tradition (Weekly Shonen Jump style), action manga conventions, Japanese comic book aesthetics.

**INTERPRETATION:** Emphasize energy, motion, and impact. Prioritize dynamic composition over static clarity. If ambiguous, favor action and intensity over subtlety.
[PROMPT END]`,
    imageUrl: '/style-previews/c3.webp',
  },
  {
    id: 'c4',
    title: 'Ligne Claire (Tintin)',
    category: 'Comics',
    description: 'Clean uniform lines, flat colors, no hatching.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A single comic panel in Ligne Claire (Clear Line) style (standard European format, approximately 6" x 8").

**LAYOUT:** Single panel composition with clear focal point. Character or subject centered or following rule of thirds. Background elements arranged to support main subject. Generous white space around panel border. All elements clearly separated with distinct boundaries.

**COMPONENTS:**
• Main character or subject in clear pose
• Background elements (architecture, landscape, or simple environment)
• Uniform border around entire panel
• Text elements (if any) clearly separated from artwork
• Decorative elements maintaining clear line style
• Consistent character design throughout

**STYLE:** Ligne Claire (Clear Line) style, inspired by Hergé's Tintin. Uniform line weight throughout (no variation). Flat vibrant colors with no gradients. No shading, hatching, or cross-hatching. Clean, precise linework. Bright, saturated color palette. Simple, clear composition. European comic book tradition.

**CONSTRAINTS:**
• No shading or hatching of any kind
• Uniform line weight - all lines must be identical thickness
• Flat colors only - no gradients or color transitions
• Clear separation between all elements
• No overlapping elements without clear boundaries
• Text must be sharp and readable
• Maintain consistent line style throughout

**SOURCE MATERIAL:** Hergé's Tintin series, European clear line tradition, Belgian/French comic book style.

**INTERPRETATION:** Emphasize clarity and simplicity. Prioritize clean composition over complexity. If ambiguous, favor geometric precision and clear boundaries.
[PROMPT END]`,
    imageUrl: '/style-previews/c4.webp',
  },
  {
    id: 'c5',
    title: 'Webtoon Vertical Scroll',
    category: 'Comics',
    description: 'Optimized for mobile, long vertical format, digital painting.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A vertical scrolling webtoon strip optimized for mobile viewing (portrait orientation, approximately 800px width, variable height).

**LAYOUT:** Single column layout with vertical flow. Panels stacked top-to-bottom with generous white space (approximately 40-60px) between panels for mobile scrolling pacing. Each panel full-width or slightly inset. Reading flow: continuous vertical scroll. Panels can vary in height for dramatic pacing.

**COMPONENTS:**
• Multiple vertical panels (4-6 panels in sequence)
• Character designs consistent across all panels
• Background elements supporting narrative
• Text elements (dialogue, narration) integrated into panels
• Transition effects between panels (if applicable)
• Mobile-optimized composition (close-ups, medium shots work best)

**STYLE:** Modern digital anime style, cel-shaded. Bright, vibrant colors. Clean digital linework. Smooth gradients and cel-shading. Contemporary webtoon aesthetic (Tower of God, Solo Leveling style). Optimized for digital display. High contrast for mobile readability.

**CONSTRAINTS:**
• No overlapping text elements
• Generous spacing between panels for mobile scrolling
• All text must be readable on small mobile screens
• Character design must remain consistent across all panels
• Maintain vertical reading flow
• Optimize for portrait orientation
• High contrast for mobile display visibility

**SOURCE MATERIAL:** Modern webtoon tradition (Korean/Asian digital comics), mobile-first comic design, contemporary anime aesthetics.

**INTERPRETATION:** Emphasize mobile-friendly composition. Prioritize vertical flow and scrolling experience. If ambiguous, favor close-ups and medium shots that work well on small screens.
[PROMPT END]`,
    imageUrl: '/style-previews/c5.webp',
  },
  {
    id: 'c6',
    title: 'Underground Comix',
    category: 'Comics',
    description: 'Gritty, psychedelic, cross-hatching, 1960s counter-culture.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A poster-style comic page in underground comix tradition (approximately 11" x 17" tabloid format).

**LAYOUT:** Dense, chaotic composition with multiple elements overlapping. No strict grid - organic, free-form arrangement. Text integrated throughout composition. Visual hierarchy through size and contrast. Reading flow can be non-linear, encouraging exploration.

**COMPONENTS:**
• Central figure or scene
• Multiple smaller elements scattered throughout
• Text integrated into composition (headlines, dialogue, captions)
• Decorative elements and patterns
• Border decorations or frames
• Counter-culture symbols and imagery
• Dense visual information throughout

**STYLE:** Underground comix style (R. Crumb, Gilbert Shelton tradition). Excessive cross-hatching for texture and shading. Grotesque exaggeration of features. Psychedelic distortion and surreal elements. Hand-drawn, raw aesthetic. High contrast black and white with occasional color accents. 1960s counter-culture visual language.

**CONSTRAINTS:**
• Dense composition is intentional - embrace visual chaos
• Cross-hatching must be consistent in style
• Maintain readability despite density
• Character exaggeration should be consistent
• No modern digital effects - maintain hand-drawn aesthetic
• Preserve counter-culture visual language
• Text integration should feel organic, not forced

**SOURCE MATERIAL:** 1960s-1970s underground comix (Zap Comix, Fabulous Furry Freak Brothers), counter-culture art, psychedelic aesthetics.

**INTERPRETATION:** Emphasize raw, unpolished aesthetic. Prioritize expressive content over technical perfection. If ambiguous, favor bold, provocative imagery over subtlety.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c6/800/600',
  },
  {
    id: 'c7',
    title: 'Graphic Novel Noir',
    category: 'Comics',
    description: 'High contrast chiaroscuro, Frank Miller style, splash of red.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Full page splash panel in graphic novel format (approximately 6.625" x 10.25", portrait orientation).

**LAYOUT:** Single full-page panel with dramatic composition. Central focal point with strong visual hierarchy. Negative space used strategically. Composition follows rule of thirds or golden ratio. All elements arranged to maximize dramatic impact.

**COMPONENTS:**
• Central character or dramatic scene
• High contrast lighting creating strong shadows
• Single accent color (red) used sparingly for maximum impact
• Background elements supporting mood
• Text elements (if any) integrated into composition
• Silhouette elements for depth
• Atmospheric elements (rain, fog, smoke)

**STYLE:** Neo-noir graphic novel style (Frank Miller's Sin City tradition). High contrast black and white (chiaroscuro). Single accent color (red) used strategically. Silhouette-heavy composition. Dramatic lighting with extreme shadows. Film noir influence. Gritty, urban aesthetic.

**CONSTRAINTS:**
• Extreme contrast - pure black and white only (except red accent)
• Red accent color used sparingly (maximum 5-10% of composition)
• Maintain dramatic lighting consistency
• No grays except where red is used
• Text must be readable despite high contrast
• Silhouette elements must be clearly defined
• Preserve noir atmosphere throughout

**SOURCE MATERIAL:** Frank Miller's Sin City, film noir aesthetics, graphic novel noir tradition, urban crime fiction.

**INTERPRETATION:** Emphasize mood and atmosphere. Prioritize dramatic composition over narrative clarity. If ambiguous, favor shadow and mystery over explicit detail.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c7/800/600?grayscale',
  },
  {
    id: 'c8',
    title: 'Retro Sci-Fi Comic',
    category: 'Comics',
    description: '1950s pulp sci-fi, bubble helmets, rayguns, washed out colors.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Comic book cover in 1950s pulp sci-fi style (US standard format, approximately 6.625" x 10.25").

**LAYOUT:** Central hero figure in futuristic setting. Title logo at top. Background elements suggesting space or alien worlds. All elements arranged to create dramatic sci-fi composition. Reading flow: top to bottom with hero as focal point.

**COMPONENTS:**
• Central hero figure in retro-futuristic costume (bubble helmet, raygun, space suit)
• Alien creatures or robots in background
• Futuristic vehicles or spacecraft
• Title logo with sci-fi typography
• Background elements (alien landscapes, space scenes, or futuristic cities)
• Energy effects or ray beams
• Issue number and price in corner

**STYLE:** 1950s Pulp Sci-Fi aesthetic. Retro-futurism (as imagined in 1950s). Matte painting background style. Distressed paper texture overlay. Washed out color palette (pastels, faded colors). Classic pulp magazine cover aesthetic. Optimistic space age vision.

**CONSTRAINTS:**
• No overlapping text elements
• Maintain retro-futuristic aesthetic (not modern sci-fi)
• Washed out colors - no vibrant modern palettes
• Distressed texture should be subtle, not overwhelming
• All text must be readable
• Preserve 1950s design sensibilities
• No modern digital effects

**SOURCE MATERIAL:** 1950s pulp sci-fi magazines (Amazing Stories, Weird Tales), retro-futurism, space age optimism, classic sci-fi illustration.

**INTERPRETATION:** Emphasize nostalgic, optimistic sci-fi vision. Prioritize 1950s aesthetic over modern realism. If ambiguous, favor classic pulp imagery over contemporary sci-fi.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c8/800/600',
  },
  {
    id: 'c9',
    title: 'Shojo Manga',
    category: 'Comics',
    description: 'Delicate lines, floral backgrounds, sparkling eyes, emotional.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A manga page in shojo style (Japanese B5 format, approximately 7.2" x 10.1").

**LAYOUT:** Multiple panels with emphasis on emotional moments. Large close-up panels for facial expressions. Background panels with decorative elements. Reading flow: traditional manga (right-to-left or left-to-right depending on context). Generous use of decorative panels and borders.

**COMPONENTS:**
• Character close-ups with expressive eyes
• Floral background elements and decorative patterns
• Sparkle effects around emotional moments
• Screentone textures for shading and mood
• Decorative panel borders (flowers, stars, hearts)
• Background elements supporting emotional tone
• Text elements (dialogue, narration) integrated gracefully
• Character designs with delicate features

**STYLE:** Shojo manga aesthetic (Sailor Moon, Fruits Basket tradition). Delicate linework with fine details. Flowery backgrounds and decorative elements. Sparkling eye effects. Screentone textures for depth and mood. Soft focus on emotional moments. Pastel color palette. Romantic, emotional tone.

**CONSTRAINTS:**
• No overlapping text or decorative elements
• Maintain delicate linework throughout
• Character design must remain consistent
• Screentone patterns must be consistent in style
• Sparkle effects should enhance, not overwhelm
• All text must be readable
• Preserve emotional focus in composition

**SOURCE MATERIAL:** Shojo manga tradition (Japanese girls' comics), romantic storytelling, decorative art styles, emotional narrative focus.

**INTERPRETATION:** Emphasize emotion and beauty. Prioritize character expression over action. If ambiguous, favor romantic, delicate imagery over dramatic action.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c9/800/600?grayscale',
  },
  {
    id: 'c10',
    title: 'Political Cartoon',
    category: 'Comics',
    description: 'Caricature, ink wash, cross-hatching, labeled objects.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Single panel editorial cartoon (newspaper format, approximately 6" x 6" square or similar proportions).

**LAYOUT:** Single panel composition with clear focal point. Central figure or scene. Labels and text integrated into composition. All elements arranged to support the political message or commentary. White background with ample negative space.

**COMPONENTS:**
• Central caricature figure(s) representing political subjects
• Visual metaphors and symbols
• Text labels identifying subjects or concepts
• Background elements supporting the message
• Decorative elements (if any) enhancing the commentary
• Speech bubbles or captions
• Visual puns or symbolic imagery

**STYLE:** Traditional editorial cartoon style. Ink cross-hatching for shading and texture. Exaggerated caricature features. Visual metaphors and symbolism. Classic political cartoon aesthetic. High contrast black and white or limited color palette. Professional editorial illustration tradition.

**CONSTRAINTS:**
• No overlapping labels - all text must be clear
• Caricature exaggeration must be consistent
• Cross-hatching must follow logical light source
• All labels must be readable
• Maintain editorial cartoon visual language
• Preserve satirical tone through visual elements
• No modern digital effects - maintain traditional ink aesthetic

**SOURCE MATERIAL:** Editorial cartoon tradition, political satire, caricature art, newspaper illustration history.

**INTERPRETATION:** Emphasize clear political message. Prioritize visual communication over aesthetic beauty. If ambiguous, favor clear symbolism and readable labels over subtle imagery.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c10/800/600',
  },
  {
    id: 'c11',
    title: 'Horror Anthology',
    category: 'Comics',
    description: 'EC Comics style, heavy shadows, lurid colors, gothic.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Comic page in 1950s horror anthology style (EC Comics format, approximately 6.625" x 10.25").

**LAYOUT:** Multiple panels with dramatic pacing. Large splash panels for key horror moments. Smaller reaction panels. Reading flow: traditional comic book left-to-right, top-to-bottom. Gutter spacing varies for dramatic effect. Composition emphasizes horror and suspense.

**COMPONENTS:**
• Central horror scene or monster reveal
• Character reaction panels
• Background elements creating atmosphere (graveyards, haunted houses, dark forests)
• Gothic architectural elements
• Shadows and lighting effects
• Text elements (dialogue, captions) supporting horror tone
• Decorative borders or panel treatments
• Consistent character design across panels

**STYLE:** 1950s Horror Comic style (EC Comics tradition - Tales from the Crypt, Vault of Horror). Heavy black shadows creating atmosphere. Lurid color palette (purples, greens, deep reds). Gothic lettering and typography. High contrast for dramatic effect. Classic horror comic aesthetic. Macabre, suspenseful tone.

**CONSTRAINTS:**
• No overlapping text elements
• Heavy shadows must follow consistent light source
• Lurid colors should enhance horror, not overwhelm
• Character design must remain consistent
• Maintain gothic aesthetic throughout
• All text must be readable despite dark atmosphere
• Preserve 1950s horror comic visual language

**SOURCE MATERIAL:** EC Comics horror anthology tradition, 1950s horror comics, gothic horror aesthetics, classic horror illustration.

**INTERPRETATION:** Emphasize atmosphere and suspense. Prioritize horror mood over explicit gore. If ambiguous, favor classic horror imagery and gothic atmosphere over modern horror tropes.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c11/800/600',
  },
  {
    id: 'c12',
    title: 'Modern Superhero',
    category: 'Comics',
    description: 'Digital coloring, cinematic lighting, realistic anatomy.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Double-page action spread in modern superhero style (US standard format, approximately 13.25" x 10.25" total width).

**LAYOUT:** Dynamic composition spanning both pages. Central action scene with hero in dramatic pose. Background elements supporting the action. Reading flow: left-to-right across both pages. Gutter between pages integrated into composition. All elements arranged for maximum visual impact.

**COMPONENTS:**
• Central hero figure in dynamic action pose
• Background elements (cityscape, battle scene, or dramatic environment)
• Energy effects and power displays
• Supporting characters or villains
• Environmental destruction or dramatic elements
• Cinematic lighting effects
• Text elements (if any) integrated into composition
• Consistent character design throughout

**STYLE:** Modern US Superhero style (contemporary Marvel/DC tradition). Digital coloring with smooth gradients. Cinematic lighting with lens flares and dramatic shadows. Realistic anatomy with superhero proportions. High detail and polish. Modern comic book aesthetic. Dynamic, action-focused composition.

**CONSTRAINTS:**
• No overlapping critical elements
• Maintain realistic anatomy despite superhero proportions
• Digital effects should enhance, not overwhelm
• Character design must remain consistent
• Cinematic lighting must follow logical light sources
• All text must be readable
• Preserve modern superhero visual language

**SOURCE MATERIAL:** Contemporary superhero comics (Marvel, DC), modern comic book art, cinematic storytelling, digital illustration techniques.

**INTERPRETATION:** Emphasize action and dynamism. Prioritize cinematic composition over static clarity. If ambiguous, favor dramatic, high-energy imagery over subtle storytelling.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c12/800/600',
  },
  {
    id: 'c13',
    title: 'Indie Graphic Memoir',
    category: 'Comics',
    description: 'Minimalist ink, personal, loose lines, emotional.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Graphic novel page in indie memoir style (standard graphic novel format, approximately 6.625" x 10.25").

**LAYOUT:** Multiple panels with emphasis on personal moments. Varied panel sizes for emotional pacing. Generous white space. Reading flow: traditional left-to-right, top-to-bottom. Composition emphasizes intimacy and personal reflection. Loose, organic panel arrangement.

**COMPONENTS:**
• Character in personal, intimate moments
• Background elements suggesting memory or reflection
• Text elements (narration, dialogue) integrated organically
• Decorative elements (if any) supporting personal tone
• Varied panel compositions
• White space used strategically
• Consistent character design (simplified, personal style)

**STYLE:** Indie Graphic Memoir aesthetic (Persepolis, Fun Home, Maus tradition). Minimalist ink brushwork with loose, expressive lines. Plenty of white space for breathing room. Loose hand-drawn borders (not perfect rectangles). Intimate, personal tone. Simple, honest linework. Emotional authenticity over technical perfection.

**CONSTRAINTS:**
• No overlapping text elements
• Loose lines are intentional - maintain hand-drawn aesthetic
• White space is crucial - don't fill every area
• Character design should feel personal, not generic
• Text integration should feel natural, not forced
• Maintain intimate, personal tone throughout
• Preserve indie aesthetic - no overly polished digital effects

**SOURCE MATERIAL:** Indie graphic memoir tradition, personal storytelling, autobiographical comics, alternative comics movement.

**INTERPRETATION:** Emphasize authenticity and emotion. Prioritize personal voice over technical perfection. If ambiguous, favor honest, intimate imagery over dramatic spectacle.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c13/800/600',
  },
  {
    id: 'c14',
    title: 'Steampunk Adventure',
    category: 'Comics',
    description: 'Brass gears, Victorian fashion, sepia tones, detailed.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Full page illustration in steampunk style (standard comic format, approximately 6.625" x 10.25").

**LAYOUT:** Single full-page composition with detailed steampunk scene. Central figure or scene. Background elements rich with steampunk details. All elements arranged to showcase Victorian-meets-technology aesthetic. Composition emphasizes intricate mechanical details.

**COMPONENTS:**
• Central character in Victorian fashion with steampunk modifications
• Intricate brass machinery and gears
• Victorian architectural elements
• Steam-powered devices and contraptions
• Background elements (airships, mechanical cities, or steampunk environments)
• Decorative elements (brass, copper, leather textures)
• Atmospheric elements (steam, smoke, industrial atmosphere)
• Consistent steampunk aesthetic throughout

**STYLE:** Steampunk aesthetic. Victorian era fashion and architecture. Brass machinery with visible gears and mechanisms. Sepia and leather color tones. Intricate mechanical details. Industrial Revolution meets fantasy technology. Rich, detailed rendering. Warm, aged color palette.

**CONSTRAINTS:**
• No overlapping critical details
• Mechanical elements must be logically constructed
• Maintain Victorian aesthetic in fashion and architecture
• Sepia tones should be consistent throughout
• All details must be clear and readable
• Preserve steampunk visual language
• Brass and copper tones should be prominent

**SOURCE MATERIAL:** Steampunk genre aesthetics, Victorian era design, industrial revolution imagery, fantasy technology, brass age machinery.

**INTERPRETATION:** Emphasize intricate detail and mechanical complexity. Prioritize steampunk aesthetic consistency. If ambiguous, favor Victorian-era technology and fashion over modern or futuristic elements.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c14/800/600',
  },
  {
    id: 'c15',
    title: 'Cyberpunk Manga',
    category: 'Comics',
    description: 'Tech-wear, neon city, cables, high detail Katsuhiro Otomo style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Manga city spread in cyberpunk style (double-page spread, Japanese B5 format, approximately 14.4" x 10.1" total width).

**LAYOUT:** Wide cityscape composition spanning both pages. Multiple levels of detail (foreground, midground, background). Reading flow: panoramic left-to-right. Dense urban environment with vertical emphasis. All elements arranged to showcase cyberpunk city complexity.

**COMPONENTS:**
• Extremely detailed cityscape with multiple buildings
• Neon signs and advertisements in Japanese/English mix
• Cables and wires connecting structures
• Tech-wear clad characters in foreground
• Flying vehicles or transportation systems
• Atmospheric elements (rain, fog, neon glow)
• Multiple layers of urban detail
• Consistent cyberpunk aesthetic throughout

**STYLE:** Cyberpunk Manga style (Katsuhiro Otomo's Akira tradition). Extremely detailed cityscapes with high line density. Destruction and decay mixed with advanced technology. Cables and wires everywhere. Tech-wear fashion (futuristic streetwear). High contrast inking. Neon color palette (blues, pinks, purples). Dense, information-rich composition.

**CONSTRAINTS:**
• No overlapping critical elements
• Extreme detail is intentional - maintain high line density
• Neon colors should be vibrant but not overwhelming
• Cables and wires must follow logical paths
• Character design must remain consistent
• Maintain cyberpunk visual language
• Preserve manga aesthetic despite cyberpunk setting

**SOURCE MATERIAL:** Katsuhiro Otomo's Akira, cyberpunk manga tradition, futuristic urban aesthetics, Japanese cyberpunk culture, tech-wear fashion.

**INTERPRETATION:** Emphasize urban density and technological complexity. Prioritize detail and atmosphere over simplicity. If ambiguous, favor cyberpunk dystopia imagery over utopian futures.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/c15/800/600',
  },

  // --- FINE ART & PAINTERLY ---
  {
    id: 'a1',
    title: 'Impressionist Oil',
    category: 'Fine Art',
    description: 'Visible brushstrokes, light emphasis, Monet/Renoir style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Oil painting on canvas (standard easel painting format, approximately 16" x 20" or similar proportions).

**LAYOUT:** Open composition with emphasis on light and atmosphere. Subject matter arranged to showcase changing light conditions. No strict central focus - composition flows naturally. Elements arranged to capture fleeting moment and light effects.

**COMPONENTS:**
• Main subject (landscape, figures, or scene)
• Visible brushstrokes throughout entire composition
• Light effects and reflections
• Atmospheric elements (mist, fog, or air)
• Background elements supporting main subject
• Color patches representing unblended pigments
• Natural elements (water, sky, foliage, or architecture)

**STYLE:** Impressionism (Monet, Renoir, Pissarro tradition). Visible short brush strokes throughout. Focus on changing light and atmospheric conditions. Open composition (not centered). Unblended color - pure pigments placed side by side. Emphasis on light over detail. Plein air aesthetic. Soft, luminous color palette.

**CONSTRAINTS:**
• Visible brushstrokes must be consistent in style
• No smooth blending - colors should remain distinct
• Light effects must follow natural light source
• Maintain impressionist color palette (no harsh contrasts)
• Composition should feel spontaneous, not overly planned
• Preserve plein air aesthetic
• No photographic realism - maintain painterly quality

**SOURCE MATERIAL:** French Impressionist movement (1870s-1880s), Monet's water lilies, Renoir's figures, Pissarro's landscapes, plein air painting tradition.

**INTERPRETATION:** Emphasize light and atmosphere over detail. Prioritize color and brushwork over precise rendering. If ambiguous, favor natural light effects and painterly technique over photographic accuracy.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a1/800/600',
  },
  {
    id: 'a2',
    title: 'Surrealist Dream',
    category: 'Fine Art',
    description: 'Melting objects, dream logic, Dali/Magritte style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Surrealist oil painting on canvas (standard easel format, approximately 20" x 24" or similar proportions).

**LAYOUT:** Dreamlike composition with impossible spatial relationships. Multiple focal points creating visual tension. Elements arranged to defy logical space. Composition follows dream logic rather than physical reality. All elements integrated to create surreal narrative.

**COMPONENTS:**
• Melting or distorted objects (clocks, figures, architecture)
• Impossible physics and spatial relationships
• Dreamlike landscapes or environments
• Symbolic elements and visual metaphors
• Hyper-realistic rendering of unreal subjects
• Atmospheric elements supporting dream state
• Multiple scales and perspectives in one scene
• Surreal juxtapositions

**STYLE:** Surrealist style (Salvador Dali, René Magritte tradition). Dreamscape aesthetic. Melting objects with impossible physics. Hyper-realistic rendering of unreal subjects. Precise detail despite surreal content. Dream logic and symbolism. Rich, detailed oil painting technique. Mysterious, thought-provoking atmosphere.

**CONSTRAINTS:**
• Surreal elements must be rendered with hyper-realistic detail
• Impossible physics should be visually convincing
• Maintain consistent light source despite spatial impossibilities
• Symbolic elements should be clear, not obscure
• Preserve surrealist visual language
• No abstract elements - everything should be representational
• Dream logic must be internally consistent

**SOURCE MATERIAL:** Surrealist art movement (1920s-1930s), Salvador Dali's melting clocks, René Magritte's visual paradoxes, dream imagery, Freudian symbolism.

**INTERPRETATION:** Emphasize dream logic and visual paradox. Prioritize thought-provoking imagery over decorative beauty. If ambiguous, favor surreal, impossible imagery over realistic representation.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a2/800/600',
  },
  {
    id: 'a3',
    title: 'Ukiyo-e Woodblock',
    category: 'Fine Art',
    description: 'Japanese woodblock print, flat perspective, Hokusai style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Japanese woodblock print (ukiyo-e format, approximately 10" x 14.5" oban size, portrait orientation).

**LAYOUT:** Traditional Japanese composition with emphasis on nature or daily life. Flat perspective with no vanishing points. Elements arranged in layers (foreground, midground, background). Reading flow: top to bottom following natural elements. Composition follows Japanese aesthetic principles.

**COMPONENTS:**
• Main subject (figure, nature scene, or daily life scene)
• Natural elements (mountains, water, trees, flowers)
• Architectural elements (if any) in Japanese style
• Decorative patterns and textures
• Text elements (if any) in Japanese calligraphy style
• Border or frame elements
• Background elements supporting main subject

**STYLE:** Ukiyo-e style (Hokusai, Hiroshige tradition). Flat perspective with no depth illusion. Bold outlines defining all elements. Gradient bokashi technique for color transitions. Nature themes and daily life. Japanese aesthetic principles. Limited color palette. Print-making aesthetic with visible wood grain texture.

**CONSTRAINTS:**
• Flat perspective - no three-dimensional illusion
• Bold outlines must be consistent throughout
• Color gradients (bokashi) must follow traditional technique
• Maintain Japanese aesthetic principles
• No Western perspective or depth
• Preserve woodblock print texture
• Limited color palette (traditional ukiyo-e colors)

**SOURCE MATERIAL:** Japanese ukiyo-e tradition (17th-19th century), Hokusai's "Great Wave", Hiroshige's landscapes, Japanese print-making techniques, Edo period aesthetics.

**INTERPRETATION:** Emphasize Japanese aesthetic and flat composition. Prioritize traditional ukiyo-e style over Western realism. If ambiguous, favor nature themes and traditional Japanese imagery over modern subjects.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a3/800/600',
  },
  {
    id: 'a4',
    title: 'Pop Art Screenprint',
    category: 'Fine Art',
    description: 'Repetition, vibrant neon colors, Warhol style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Silk screen print in Pop Art style (standard print format, approximately 20" x 24" or square format).

**LAYOUT:** Grid-based composition with repetitive imagery. Multiple identical or varied images arranged in grid pattern. Central focus on repeated subject. All elements arranged to emphasize repetition and mass production aesthetic. Composition follows Pop Art principles of seriality.

**COMPONENTS:**
• Repeated subject (portrait, object, or image) in grid pattern
• High contrast color separations
• Halftone dot patterns for shading
• Vibrant neon color blocks
• Text elements (if any) in bold typography
• Background elements supporting repetition
• Color variations across repetitions
• Border or frame elements

**STYLE:** Pop Art style (Andy Warhol tradition). High contrast color separations. Halftone dots for texture and shading. Repetitive imagery emphasizing mass production. Vibrant neon color blocks (bright pinks, yellows, blues, greens). Bold, graphic aesthetic. Commercial printing techniques. 1960s Pop Art movement.

**CONSTRAINTS:**
• Repetition must be consistent in grid pattern
• High contrast - no subtle color transitions
• Halftone dots must be visible and consistent
• Vibrant colors should be saturated, not muted
• Maintain Pop Art visual language
• No realistic shading - use color blocks and halftones
• Preserve commercial printing aesthetic

**SOURCE MATERIAL:** Pop Art movement (1960s), Andy Warhol's screenprints, mass media imagery, commercial art aesthetics, 1960s visual culture.

**INTERPRETATION:** Emphasize repetition and mass production aesthetic. Prioritize bold, graphic imagery over subtle artistry. If ambiguous, favor commercial, popular culture imagery over fine art subjects.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a4/800/600',
  },
  {
    id: 'a5',
    title: 'Art Nouveau',
    category: 'Fine Art',
    description: 'Organic lines, floral motifs, Mucha style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Decorative poster in Art Nouveau style (standard poster format, approximately 19" x 27" or similar proportions, portrait orientation).

**LAYOUT:** Vertical composition with flowing organic lines. Central figure or subject. Decorative borders and frames. Text elements integrated into design. All elements arranged to create harmonious, flowing composition. Emphasis on verticality and organic movement.

**COMPONENTS:**
• Central figure or subject (often female form)
• Flowing organic lines and curves (whiplash lines)
• Floral motifs and botanical elements
• Decorative borders and frames
• Text elements integrated into design
• Stained glass-like color blocks
• Gold leaf or metallic accents
• Background patterns supporting main design

**STYLE:** Art Nouveau style (Alphonse Mucha tradition). Whiplash curves and organic lines. Floral and botanical motifs. Stained glass outlines with defined color blocks. Pastel palette with gold leaf accents. Decorative, ornamental aesthetic. 1890s-1910s design movement. Elegant, flowing composition.

**CONSTRAINTS:**
• Organic lines must flow continuously
• Floral motifs should be consistent in style
• Color blocks must have clear boundaries (stained glass effect)
• Gold accents should be used sparingly for emphasis
• Maintain Art Nouveau decorative language
• No harsh geometric shapes - favor organic forms
• Preserve elegant, ornamental aesthetic

**SOURCE MATERIAL:** Art Nouveau movement (1890s-1910s), Alphonse Mucha's posters, decorative arts tradition, organic design principles, fin-de-siècle aesthetics.

**INTERPRETATION:** Emphasize elegance and organic flow. Prioritize decorative beauty over functional clarity. If ambiguous, favor floral, organic imagery over geometric or industrial elements.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a5/800/600',
  },
  {
    id: 'a6',
    title: 'Cubist Fragmentation',
    category: 'Fine Art',
    description: 'Geometric shapes, multiple viewpoints, Picasso/Braque.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Oil painting on canvas in Analytical Cubism style (standard easel format, approximately 18" x 24" or similar proportions).

**LAYOUT:** Fragmented composition showing multiple viewpoints simultaneously. Geometric planes intersecting and overlapping. No single focal point - composition distributed across canvas. Elements arranged to show subject from multiple angles at once. All planes integrated into unified composition.

**COMPONENTS:**
• Fragmented subject (figure, still life, or scene) shown from multiple angles
• Geometric planes and facets
• Overlapping transparent planes
• Multiple viewpoints integrated
• Analytical deconstruction of form
• Background and foreground integrated
• Textural elements (if any) supporting fragmentation
• Consistent geometric language throughout

**STYLE:** Analytical Cubism (Picasso, Braque tradition, 1908-1912). Fragmented objects showing multiple viewpoints simultaneously. Geometric deconstruction of form. Muted color palette (browns, greys, ochres). Overlapping transparent planes. No single perspective. Abstracted representation. Intellectual, analytical approach to form.

**CONSTRAINTS:**
• Fragmentation must be systematic, not random
• Multiple viewpoints should be logically integrated
• Geometric planes must follow cubist principles
• Muted color palette - no bright colors
• Maintain analytical cubist visual language
• No realistic representation - favor geometric abstraction
• Preserve intellectual, analytical aesthetic

**SOURCE MATERIAL:** Analytical Cubism movement (1908-1912), Picasso and Braque's early cubist works, geometric abstraction, multiple perspective representation.

**INTERPRETATION:** Emphasize geometric analysis of form. Prioritize intellectual deconstruction over visual beauty. If ambiguous, favor geometric fragmentation and multiple viewpoints over single perspective representation.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a6/800/600',
  },
  {
    id: 'a7',
    title: 'Bauhaus Design',
    category: 'Fine Art',
    description: 'Minimalist, geometric, primary colors, form follows function.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Exhibition poster in Bauhaus style (standard poster format, approximately 19" x 27" or similar proportions).

**LAYOUT:** Grid-based composition with geometric elements. Asymmetric balance following Bauhaus principles. Clear visual hierarchy. Text and image integrated systematically. All elements aligned to grid system. Composition emphasizes function and clarity over decoration.

**COMPONENTS:**
• Geometric shapes (circles, squares, triangles, lines)
• Sans-serif typography (Bauhaus or similar)
• Primary color blocks (red, blue, yellow) plus black
• Diagonal elements for dynamism
• Grid system visible in composition
• Text elements integrated into design
• Minimal decorative elements
• Functional, clear information hierarchy

**STYLE:** Bauhaus design (1920s-1930s German design school). Geometric abstraction with primary colors. Sans-serif typography. Asymmetric composition. Form follows function principle. Minimalist aesthetic. Red, blue, yellow, and black color palette. Clean, functional design. Industrial, modern aesthetic.

**CONSTRAINTS:**
• Geometric shapes only - no organic forms
• Primary colors only (red, blue, yellow) plus black and white
• Sans-serif typography - no decorative fonts
• Asymmetric balance - no centered compositions
• Grid alignment must be clear
• No decorative elements - function first
• Maintain Bauhaus visual language
• Preserve minimalist, functional aesthetic

**SOURCE MATERIAL:** Bauhaus design school (1919-1933), modernism, functional design, geometric abstraction, industrial design principles.

**INTERPRETATION:** Emphasize function and clarity. Prioritize geometric precision over organic beauty. If ambiguous, favor functional, systematic design over decorative elements.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a7/800/600',
  },
  {
    id: 'a8',
    title: 'Watercolor Landscape',
    category: 'Fine Art',
    description: 'Wet-on-wet, transparent layers, paper texture.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Watercolor painting on paper (standard watercolor paper format, approximately 11" x 14" or similar proportions, portrait or landscape orientation).

**LAYOUT:** Natural landscape composition with emphasis on atmosphere. Elements arranged to showcase watercolor technique. Open composition with generous negative space. Reading flow follows natural landscape elements. All elements integrated to create atmospheric scene.

**COMPONENTS:**
• Landscape elements (mountains, trees, water, sky)
• Atmospheric elements (mist, clouds, or weather)
• Natural textures (foliage, rocks, water surfaces)
• Transparent color layers
• Negative space (white paper showing through)
• Pigment bleeding and color mixing
• Paper grain texture visible
• Natural light effects

**STYLE:** Loose watercolor technique. Wet-on-wet technique creating pigment bleeding. Transparent layers allowing paper to show through. Negative space used strategically. Rough paper grain visibility. Spontaneous, fluid brushwork. Natural, atmospheric color palette. Plein air aesthetic.

**CONSTRAINTS:**
• Transparent layers - no opaque coverage
• Pigment bleeding is intentional - embrace fluidity
• Paper texture must be visible
• Negative space is crucial - don't fill entire surface
• Maintain watercolor transparency
• No heavy opaque areas
• Preserve spontaneous, fluid aesthetic
• Natural color mixing, not forced blending

**SOURCE MATERIAL:** Watercolor painting tradition, plein air landscape painting, atmospheric landscape art, transparent painting techniques.

**INTERPRETATION:** Emphasize atmosphere and spontaneity. Prioritize watercolor technique over detailed rendering. If ambiguous, favor loose, fluid brushwork and atmospheric effects over precise detail.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a8/800/600',
  },
  {
    id: 'a9',
    title: 'Renaissance Portrait',
    category: 'Fine Art',
    description: 'Sfumato, chiaroscuro, anatomical precision, Da Vinci style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Oil painting on wood panel in High Renaissance style (standard portrait format, approximately 16" x 20" or similar proportions, portrait orientation).

**LAYOUT:** Pyramid composition with figure as central focus. Three-quarter or frontal view. Background elements supporting the portrait. All elements arranged to create harmonious, balanced composition. Emphasis on figure and psychological presence.

**COMPONENTS:**
• Central portrait figure (three-quarter or frontal view)
• Anatomically precise rendering
• Dramatic lighting creating chiaroscuro
• Background elements (landscape, architecture, or simple backdrop)
• Atmospheric perspective in background
• Textural details (fabric, skin, hair)
• Subtle sfumato blending
• Balanced, harmonious composition

**STYLE:** High Renaissance style (Leonardo da Vinci, Raphael tradition). Sfumato blending (soft, smoky transitions). Pyramid composition for stability. Dramatic chiaroscuro (extreme light/dark contrast). Anatomical precision and naturalism. Atmospheric perspective. Rich, warm color palette. Classical, idealized beauty.

**CONSTRAINTS:**
• Sfumato blending must be subtle and smooth
• Chiaroscuro must follow single light source
• Anatomical accuracy is paramount
• Maintain Renaissance color palette (warm, rich tones)
• No harsh edges - favor soft transitions
• Preserve classical, idealized aesthetic
• Background should support, not compete with figure

**SOURCE MATERIAL:** High Renaissance art (1500s), Leonardo da Vinci's portraits, Raphael's figures, Renaissance painting techniques, classical portraiture.

**INTERPRETATION:** Emphasize classical beauty and psychological presence. Prioritize anatomical accuracy and harmonious composition. If ambiguous, favor idealized, classical representation over realistic imperfection.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a9/800/600',
  },
  {
    id: 'a10',
    title: 'Street Art Graffiti',
    category: 'Fine Art',
    description: 'Spray paint, stencils, urban texture, Banksy/Basquiat.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Concrete wall or urban surface for street art (variable size, typically large scale, portrait or landscape orientation).

**LAYOUT:** Dynamic composition adapted to wall surface. Central image or text element. Background texture of wall visible. All elements arranged to work with urban environment. Composition emphasizes bold, immediate impact.

**COMPONENTS:**
• Central image, text, or symbolic element
• Spray paint texture and drips
• Stencil elements (if applicable)
• Bold scrawled text or lettering
• Urban decay textures (peeling paint, cracks, weathering)
• Background wall texture
• Color layers and overlapping elements
• Urban environment context

**STYLE:** Neo-expressionist street art (Banksy, Basquiat tradition). Spray paint texture with visible drips and overspray. Stencil techniques for precision. Bold scrawled text and symbols. Urban decay aesthetic. High contrast. Raw, immediate visual language. Street art authenticity.

**CONSTRAINTS:**
• Spray paint texture must be visible
• Drips and overspray are intentional - embrace imperfection
• Urban wall texture should be visible
• Maintain street art visual language
• No overly polished digital effects
• Preserve raw, urban aesthetic
• Text and imagery should feel immediate, not refined

**SOURCE MATERIAL:** Street art movement, Banksy's stencils, Basquiat's neo-expressionism, graffiti culture, urban art tradition.

**INTERPRETATION:** Emphasize raw, immediate impact. Prioritize street art authenticity over technical perfection. If ambiguous, favor bold, provocative imagery over subtle artistry.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a10/800/600',
  },
  {
    id: 'a11',
    title: 'Pointillism',
    category: 'Fine Art',
    description: 'Dots of pure color, Seurat style, optical mixing.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Canvas painting in Pointillist style (standard easel format, approximately 20" x 24" or larger, landscape or portrait orientation).

**LAYOUT:** Composition following subject matter (landscape, figures, or scene). Elements arranged to showcase pointillist technique. All areas of composition covered with dots. Reading flow follows natural subject matter. Composition emphasizes color and light through dot technique.

**COMPONENTS:**
• Main subject (landscape, figures, or scene)
• Entire image composed of small distinct dots
• Pure color dots (no mixing on palette)
• Optical color mixing through dot proximity
• Light effects created through dot density
• Background elements in pointillist technique
• Consistent dot size throughout
• Luminous color effects

**STYLE:** Pointillism (Georges Seurat, Paul Signac tradition). Image composed entirely of small distinct dots of pure color. Optical color mixing (colors blend in viewer's eye). No brushstrokes - only dots. Luminous, vibrant color effects. Scientific approach to color. Neo-Impressionist technique. Systematic dot application.

**CONSTRAINTS:**
• Entire image must be composed of dots - no brushstrokes
• Dots must be consistent in size
• Pure colors only - no color mixing on palette
• Optical mixing through dot proximity
• Maintain pointillist technique throughout
• No smooth blending - only dot-based color
• Preserve luminous, vibrant color effects

**SOURCE MATERIAL:** Pointillism movement (1880s-1890s), Georges Seurat's "A Sunday Afternoon", Neo-Impressionism, scientific color theory, optical color mixing.

**INTERPRETATION:** Emphasize color and light through dot technique. Prioritize systematic pointillist application over expressive brushwork. If ambiguous, favor pure color dots and optical mixing over traditional painting techniques.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a11/800/600',
  },
  {
    id: 'a12',
    title: 'Fauvism',
    category: 'Fine Art',
    description: 'Wild brush work, strident colors, Matisse style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Oil painting on canvas in Fauvist style (standard easel format, approximately 18" x 24" or similar proportions).

**LAYOUT:** Bold composition with emphasis on color and expression. Subject matter arranged to showcase wild brushwork and strident colors. Elements arranged for maximum color impact. Composition follows expressive, emotional principles rather than realistic representation.

**COMPONENTS:**
• Main subject (landscape, figures, or scene)
• Wild, expressive brushwork throughout
• Strident, unnatural colors
• Bold color blocks and patches
• Expressive forms and shapes
• Background elements in fauvist style
• Color used for expression, not realism
• Dynamic, energetic composition

**STYLE:** Fauvism (Henri Matisse, André Derain tradition). Wild brush work with visible, expressive strokes. Strong unnatural colors (strident blues, greens, reds, oranges). Painterly qualities over realistic color values. Bold, simplified forms. Expressive use of color. Early 1900s avant-garde movement. Emotional, vibrant aesthetic.

**CONSTRAINTS:**
• Wild brushwork is intentional - maintain expressive strokes
• Strident colors - no muted or realistic palettes
• Color used for expression, not accurate representation
• Maintain fauvist visual language
• No realistic color values
• Preserve bold, energetic aesthetic
• Forms can be simplified for color impact

**SOURCE MATERIAL:** Fauvism movement (1905-1908), Henri Matisse's early works, André Derain, expressive color use, early modernism.

**INTERPRETATION:** Emphasize color expression and emotional impact. Prioritize bold color and brushwork over realistic representation. If ambiguous, favor strident, unnatural colors and wild brushwork over subtle, realistic painting.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a12/800/600',
  },
  {
    id: 'a13',
    title: 'Abstract Expressionism',
    category: 'Fine Art',
    description: 'Action painting, drips, chaos, Pollock style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Large canvas in Abstract Expressionist style (large format, approximately 48" x 72" or larger, horizontal or square orientation).

**LAYOUT:** All-over composition with no central focus. Drips, splatters, and paint application distributed across entire canvas. Elements arranged through action painting process. Composition emphasizes process and gesture over planned design. All areas of canvas equally important.

**COMPONENTS:**
• Drips and splatters of paint
• Action painting gestures
• Layered paint applications
• Color interactions and mixing
• Textural paint buildup
• No representational elements
• Entire canvas as unified field
• Process and gesture visible

**STYLE:** Abstract Expressionism (Jackson Pollock, action painting tradition). Action painting with drips and splatters. Non-representational, abstract composition. Emotional intensity through process. All-over composition (no focal point). Large scale. Process-oriented aesthetic. Gestural, energetic application.

**CONSTRAINTS:**
• No representational elements - pure abstraction
• Drips and splatters are intentional - embrace process
• All-over composition - no central focus
• Maintain abstract expressionist visual language
• Process and gesture should be visible
• No planned design - favor spontaneous application
• Preserve energetic, gestural aesthetic

**SOURCE MATERIAL:** Abstract Expressionism movement (1940s-1950s), Jackson Pollock's drip paintings, action painting, gestural abstraction, process-oriented art.

**INTERPRETATION:** Emphasize process and emotional expression. Prioritize gestural application and color interaction over planned composition. If ambiguous, favor abstract, non-representational imagery over figurative elements.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a13/800/600',
  },
  {
    id: 'a14',
    title: 'Baroque Dramatic',
    category: 'Fine Art',
    description: 'Deep shadows, intense emotion, Caravaggio style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Oil painting on canvas in Baroque style (standard easel format, approximately 20" x 24" or larger, portrait or landscape orientation).

**LAYOUT:** Dramatic composition with strong diagonal movement. Central figures or scene with intense emotional focus. Background elements supporting dramatic narrative. All elements arranged to maximize emotional impact and dramatic tension. Composition emphasizes movement and emotion.

**COMPONENTS:**
• Central figures in dramatic poses
• Extreme light/dark contrast (tenebrism)
• Deep shadows creating atmosphere
• Background elements supporting drama
• Textural details (fabric, skin, materials)
• Atmospheric elements (smoke, light rays)
• Dynamic movement and gesture
• Emotional intensity in expressions

**STYLE:** Baroque style (Caravaggio, Rembrandt tradition). Tenebrism (extreme light/dark contrast). Dramatic chiaroscuro with deep shadows. Dynamic movement and diagonal composition. Intense emotional expression. Rich, warm color palette. Theatrical lighting. Emotional, dramatic aesthetic.

**CONSTRAINTS:**
• Extreme contrast - deep shadows and bright highlights
• Tenebrism must follow single dramatic light source
• Maintain baroque color palette (warm, rich tones)
• Dynamic movement should be clear
• Emotional intensity in expressions
• Preserve dramatic, theatrical aesthetic
• No flat lighting - favor dramatic chiaroscuro

**SOURCE MATERIAL:** Baroque period (1600s), Caravaggio's tenebrism, Rembrandt's dramatic lighting, baroque painting techniques, dramatic religious art.

**INTERPRETATION:** Emphasize drama and emotional intensity. Prioritize theatrical lighting and movement over subtle representation. If ambiguous, favor dramatic, emotional imagery over calm, balanced composition.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a14/800/600',
  },
  {
    id: 'a15',
    title: 'Pre-Raphaelite',
    category: 'Fine Art',
    description: 'Detailed nature, romance, vivid colors, Millais/Rossetti.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Oil painting on canvas in Pre-Raphaelite style (standard easel format, approximately 20" x 24" or larger, portrait or landscape orientation).

**LAYOUT:** Detailed composition with emphasis on natural elements and figures. Elements arranged to showcase intense detail and romantic subject matter. Reading flow follows natural composition. All elements integrated to create romantic, detailed scene. Composition emphasizes beauty and natural detail.

**COMPONENTS:**
• Central figures (often in romantic or medieval settings)
• Intensely detailed natural elements (flowers, foliage, landscapes)
• Romantic or medieval subject matter
• Textural details throughout (fabric, nature, materials)
• Background elements with equal detail
• Symbolic elements and visual metaphors
• Natural light effects
• Rich, detailed rendering

**STYLE:** Pre-Raphaelite style (Millais, Rossetti, Burne-Jones tradition). Intense attention to natural detail. Romantic medieval subjects. Vivid jewel-tone colors (emerald greens, ruby reds, sapphire blues). Realistic rendering with symbolic content. 1850s-1890s British art movement. Beautiful, romantic aesthetic.

**CONSTRAINTS:**
• Intense detail throughout - no simplified areas
• Natural elements must be botanically accurate
• Vivid jewel-tone colors - no muted palettes
• Maintain pre-raphaelite visual language
• Romantic or medieval subject matter
• Preserve beautiful, idealized aesthetic
• Equal attention to all areas of composition

**SOURCE MATERIAL:** Pre-Raphaelite Brotherhood (1850s-1890s), John Everett Millais, Dante Gabriel Rossetti, romantic medievalism, detailed naturalism.

**INTERPRETATION:** Emphasize beauty and natural detail. Prioritize romantic, idealized imagery over harsh realism. If ambiguous, favor detailed, beautiful representation with romantic or medieval subjects over contemporary or abstract imagery.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/a15/800/600',
  },

  // --- EDUCATIONAL & DIAGRAMS ---
  {
    id: 'e1',
    title: 'Anatomical Cutaway',
    category: 'Educational',
    description: 'Medical illustration, layered transparency, labels.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A medical illustration plate designed for educational use (standard 8.5" x 11" format, portrait orientation).

**LAYOUT:** Central anatomical figure in cutaway view. Labels arranged around the figure with leader lines. Title at top center. Legend/key in bottom right corner. All elements arranged to maximize clarity and educational value. White background with ample negative space.

**COMPONENTS:**
• Central anatomical figure (human body or organ system)
• Cutaway section revealing internal structures
• Multiple layers showing different anatomical systems
• Leader lines connecting labels to specific structures
• Text labels with anatomical names
• Color-coded regions for different systems
• Scale reference indicator
• Title block with subject name
• Legend explaining color coding and abbreviations

**STYLE:** Realistic anatomical rendering. Scientific illustration tradition. Clean, precise linework. Color-coded systems (cardiovascular in red, nervous in yellow, etc.). Layered transparency effects showing depth. Professional medical textbook aesthetic. High detail and accuracy.

**CONSTRAINTS:**
• No overlapping labels or leader lines
• All text must be sharp and readable
• Anatomical accuracy is paramount
• Consistent color coding throughout
• Leader lines must not cross unnecessarily
• Maintain scientific precision in all details
• Labels must be clearly associated with correct structures

**SOURCE MATERIAL:** Medical illustration standards, anatomical reference materials, scientific visualization practices, educational textbook conventions.

**INTERPRETATION:** Prioritize accuracy and clarity above all. Emphasize educational value. If ambiguous, favor scientific precision over aesthetic appeal.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e1/800/600',
  },
  {
    id: 'e2',
    title: 'Botanical Illustration',
    category: 'Educational',
    description: 'Scientific accuracy, isolated on white, vintage style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Vintage botanical illustration plate (standard scientific plate format, approximately 8.5" x 11", portrait orientation).

**LAYOUT:** Central plant specimen isolated on white background. Multiple views arranged around main specimen (full plant, detail views, life cycle stages). Labels positioned with leader lines. All elements arranged for scientific clarity and educational value. White background with ample negative space.

**COMPONENTS:**
• Main plant specimen (full view)
• Detail views (flowers, leaves, roots, seeds)
• Life cycle stages (if applicable)
• Leader lines connecting labels to parts
• Text labels with botanical names
• Scale reference indicator
• Decorative border or frame (if vintage style)
• Scientific accuracy in all details

**STYLE:** Scientific botanical illustration. Watercolor and ink technique. Isolated on white background. Highly detailed and botanically accurate. Vintage scientific plate aesthetic. Realistic color rendering. Clean, precise linework. Educational, informative presentation.

**CONSTRAINTS:**
• Scientific accuracy is paramount
• No overlapping labels or leader lines
• All botanical details must be accurate
• White background - no decorative elements competing
• Labels must be clearly readable
• Maintain scientific illustration standards
• Preserve vintage plate aesthetic
• Color must be botanically accurate

**SOURCE MATERIAL:** Botanical illustration tradition, scientific plant documentation, vintage natural history plates, educational illustration standards.

**INTERPRETATION:** Emphasize scientific accuracy and educational clarity. Prioritize botanical precision over aesthetic beauty. If ambiguous, favor accurate scientific representation over artistic interpretation.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e2/800/600',
  },
  {
    id: 'e3',
    title: 'Technical Blueprint',
    category: 'Educational',
    description: 'White lines on blue, orthographic projection, measurements.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Engineering blueprint (standard blueprint format, approximately 11" x 17" or larger, landscape orientation).

**LAYOUT:** Technical drawing with orthographic projections. Multiple views arranged systematically (front, top, side views). Dimension lines and measurements clearly labeled. Title block in corner. All elements aligned to technical drawing standards. Grid or border for reference.

**COMPONENTS:**
• Orthographic projection views (front, top, side)
• Dimension lines with measurements
• Technical annotations and notes
• Title block with project information
• Grid lines or border
• Section lines (if applicable)
• Center lines and construction lines
• Scale indicator

**STYLE:** Cyanotype blueprint style. White lines on blue background. Orthographic projection technique. Technical drawing standards. Precise linework. Dimension lines with arrows. Professional engineering aesthetic. Blueprint printing technique simulation.

**CONSTRAINTS:**
• White lines only on blue background
• Orthographic projection must be accurate
• All measurements must be clearly labeled
• Dimension lines must not overlap
• Maintain technical drawing standards
• No decorative elements - function only
• Preserve blueprint aesthetic
• All text must be readable

**SOURCE MATERIAL:** Engineering drawing standards, blueprint tradition, technical documentation, orthographic projection techniques, architectural/mechanical drawing.

**INTERPRETATION:** Emphasize technical accuracy and clarity. Prioritize precise measurements and standard drawing conventions over aesthetic appeal. If ambiguous, favor engineering accuracy and standard technical drawing practices.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e3/800/600',
  },
  {
    id: 'e4',
    title: 'Isometric Infographic',
    category: 'Educational',
    description: '3D vector style, clean gradients, floating elements.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Isometric infographic (digital format, standard screen dimensions, landscape orientation).

**LAYOUT:** Isometric grid system with 3D elements arranged in space. Multiple information blocks or sections. Floating elements at consistent isometric angle. Reading flow: left-to-right, top-to-bottom. All elements aligned to isometric grid. Composition emphasizes 3D spatial relationships.

**COMPONENTS:**
• 3D isometric objects or icons
• Information blocks with text
• Connecting lines or arrows
• Floating elements at isometric angle
• Background grid (subtle)
• Color-coded sections or categories
• Icons or illustrations in isometric style
• Text labels and annotations

**STYLE:** Modern vector 3D isometric style. Clean gradients for depth. Soft shadows for 3D effect. Floating elements with consistent isometric angle (30-degree perspective). Bright, modern color palette. Clean, professional aesthetic. Digital illustration technique.

**CONSTRAINTS:**
• All elements must follow consistent isometric angle
• Isometric grid alignment must be maintained
• Clean gradients - no harsh transitions
• Soft shadows for 3D effect
• No overlapping critical information
• Maintain modern vector aesthetic
• Preserve clean, professional look
• All text must be readable

**SOURCE MATERIAL:** Modern infographic design, isometric illustration, 3D vector graphics, information design, digital illustration techniques.

**INTERPRETATION:** Emphasize clarity and modern aesthetic. Prioritize consistent isometric perspective and clean design over decorative complexity. If ambiguous, favor clean, professional isometric illustration over realistic 3D rendering.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e4/800/600',
  },
  {
    id: 'e5',
    title: 'Knolling Photography',
    category: 'Educational',
    description: 'Overhead shot, items arranged at 90 degrees, organized.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Overhead photography in knolling style (standard photography format, square or landscape orientation, high resolution).

**LAYOUT:** Overhead 90-degree angle view. Objects arranged in parallel lines or at 90-degree angles to each other. Organized by size, color, or category. Clean background (white, gray, or neutral). All objects clearly visible and separated. Composition emphasizes organization and order.

**COMPONENTS:**
• Multiple objects arranged systematically
• Objects aligned to parallel lines or 90-degree angles
• Clean, neutral background
• Consistent lighting (no harsh shadows)
• Objects organized by category, size, or color
• All objects in focus (deep depth of field)
• Minimal or no overlapping
• Text labels (if educational)

**STYLE:** Knolling (Flat Lay) photography style. Overhead 90-degree angle. Objects arranged in parallel or 90-degree angles. Organized by size/color/category. Clean background (white, gray, or neutral). Even lighting with minimal shadows. High detail and sharp focus. Organized, systematic aesthetic.

**CONSTRAINTS:**
• Overhead 90-degree angle - no perspective distortion
• Objects must be arranged at parallel or 90-degree angles
• Clean background - no distracting elements
• Even lighting - minimal shadows
• All objects in sharp focus
• Maintain organized, systematic arrangement
• Preserve knolling aesthetic
• No overlapping objects

**SOURCE MATERIAL:** Knolling photography technique, flat lay photography, organized product photography, systematic arrangement, overhead photography.

**INTERPRETATION:** Emphasize organization and clarity. Prioritize systematic arrangement and clean composition over artistic complexity. If ambiguous, favor organized, parallel arrangements over random or artistic placement.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e5/800/600',
  },
  {
    id: 'e6',
    title: 'Ikea Assembly Art',
    category: 'Educational',
    description: 'Line art, no text, helpful man character, steps.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Instruction manual step illustration (standard manual format, approximately 8.5" x 11" or smaller, portrait orientation).

**LAYOUT:** Single step illustration with clear sequence. Central assembly action. Step number indicator. All elements arranged to show one clear action. Composition emphasizes clarity and simplicity. Reading flow: top to bottom, left to right.

**COMPONENTS:**
• Helpful man character in neutral pose
• Assembly parts or components
• Arrows showing direction or movement
• Step number indicator
• Assembly sequence clearly shown
• Parts labeled with numbers or letters (if needed)
• Simple background (white or neutral)
• Clear action or instruction

**STYLE:** Minimalist line art (IKEA instruction style). Thick rounded outlines. No shading or gradients. Isometric or simple perspective. Neutral expression characters. Clean, simple aesthetic. High contrast black and white. Functional, instructional design.

**CONSTRAINTS:**
• Line art only - no shading or color fills
• Thick rounded outlines - consistent line weight
• No text in illustration (except step numbers)
• Neutral character expressions
• Isometric or simple perspective
• Maintain IKEA instruction aesthetic
• Preserve clean, simple design
• All elements must be clearly readable

**SOURCE MATERIAL:** IKEA instruction manuals, minimalist instructional illustration, assembly diagram tradition, functional design, universal design principles.

**INTERPRETATION:** Emphasize clarity and simplicity. Prioritize functional instruction over artistic beauty. If ambiguous, favor clear, simple line art over detailed or decorative illustration.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e6/800/600',
  },
  {
    id: 'e7',
    title: 'Vintage Map',
    category: 'Educational',
    description: 'Parchment texture, compass rose, sea monsters.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Cartographic map in 17th century style (standard map format, variable size, landscape orientation).

**LAYOUT:** Map composition with geographic features. Compass rose in corner. Decorative borders. Sea monsters and decorative elements in oceans. Labels for locations. All elements arranged to create vintage cartographic aesthetic. Composition follows historical map conventions.

**COMPONENTS:**
• Geographic features (coastlines, landmasses, islands)
• Compass rose (decorative directional indicator)
• Sea monsters and mythical creatures in oceans
• Decorative borders and frames
• Hand-drawn coastlines
• Location labels in calligraphy style
• Decorative ships or vessels
• Parchment texture throughout

**STYLE:** 17th Century Cartography aesthetic. Parchment texture and aged paper appearance. Hand-drawn coastlines with artistic interpretation. Compass rose with decorative design. Sea monsters and mythical creatures. Calligraphy labels. Vintage map color palette (browns, tans, aged colors). Historical cartographic tradition.

**CONSTRAINTS:**
• Parchment texture must be visible throughout
• Hand-drawn aesthetic - no perfect digital precision
• Sea monsters should be decorative, not overwhelming
• Maintain vintage map color palette
• Calligraphy labels must be readable
• Preserve historical cartographic aesthetic
• Decorative elements should enhance, not distract

**SOURCE MATERIAL:** 17th century cartography, vintage maps, historical map-making, decorative cartography, age of exploration maps.

**INTERPRETATION:** Emphasize historical cartographic aesthetic. Prioritize vintage map style and decorative elements over modern geographic accuracy. If ambiguous, favor artistic, decorative cartography over precise modern mapping.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e7/800/600',
  },
  {
    id: 'e8',
    title: 'Exploded View',
    category: 'Educational',
    description: 'Parts separated in space to show assembly, technical.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Technical diagram in exploded view style (standard technical illustration format, approximately 11" x 17" or similar, portrait or landscape orientation).

**LAYOUT:** Central axis with components separated along that axis. Parts arranged to show assembly sequence. Dotted guide lines connecting parts. All elements arranged to clearly show how parts fit together. Composition emphasizes technical clarity and assembly understanding.

**COMPONENTS:**
• Individual parts separated along central axis
• Dotted guide lines showing part relationships
• Part numbers or labels
• Assembly sequence indicators
• Central axis line (if visible)
• Background elements (if any) supporting clarity
• Scale reference
• Technical annotations

**STYLE:** Exploded view technical illustration. Components separated along central axis. Dotted guide lines connecting parts. Mechanical shading for 3D effect. Technical drawing aesthetic. Clean, precise linework. Professional engineering illustration. High detail and accuracy.

**CONSTRAINTS:**
• Parts must be separated along logical axis
• Dotted guide lines must clearly show relationships
• No overlapping parts
• Part numbers must be clearly readable
• Maintain technical drawing standards
• Preserve exploded view visual language
• All parts must be clearly identifiable
• Assembly sequence should be logical

**SOURCE MATERIAL:** Technical illustration, exploded view diagrams, assembly instructions, engineering documentation, mechanical drawing.

**INTERPRETATION:** Emphasize technical clarity and assembly understanding. Prioritize clear part relationships and logical sequence over aesthetic appeal. If ambiguous, favor accurate technical representation over decorative elements.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e8/800/600',
  },
  {
    id: 'e9',
    title: 'Cross-Section',
    category: 'Educational',
    description: 'Sliced view of building or object, "Look Inside" style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Cross-section illustration in "Look Inside" style (standard illustration format, approximately 11" x 14" or similar, portrait or landscape orientation).

**LAYOUT:** Cutaway view showing interior and exterior simultaneously. Multiple levels or floors visible. Tiny characters or elements showing scale and activity. All elements arranged to maximize "look inside" effect. Composition emphasizes interior detail and human scale.

**COMPONENTS:**
• Exterior structure with cutaway section
• Interior details visible through cutaway
• Multiple levels or floors (if applicable)
• Tiny characters interacting with interior
• Interior elements (furniture, equipment, details)
• Exterior elements for context
• Scale indicators (human figures)
• Detailed interior rendering

**STYLE:** Stephen Biesty "Look Inside" style. "Slice of life" cutaway view. Busy details throughout interior. Tiny characters interacting with space. High detail and information density. Realistic rendering with educational focus. Warm, inviting color palette. Detailed, informative aesthetic.

**CONSTRAINTS:**
• Cutaway must clearly show interior
• Tiny characters must be consistent in style
• Interior details must be accurate and clear
• No overlapping critical interior elements
• Maintain "look inside" visual language
• Preserve detailed, busy aesthetic
• All interior elements must be readable
• Scale relationships must be accurate

**SOURCE MATERIAL:** Stephen Biesty's cross-section books, "Look Inside" illustration tradition, educational cutaway illustrations, detailed technical illustration.

**INTERPRETATION:** Emphasize interior detail and educational value. Prioritize "look inside" clarity and information density over simplified representation. If ambiguous, favor detailed, busy interiors with human scale elements over minimalist cutaways.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e9/800/600',
  },
  {
    id: 'e10',
    title: 'Periodic Table Chart',
    category: 'Educational',
    description: 'Grid layout, color coded, scientific typography.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Scientific periodic table chart (standard educational poster format, approximately 24" x 36" or similar, landscape orientation).

**LAYOUT:** Strict tabular grid with rows (periods) and columns (groups). Elements arranged in standard periodic table organization. Color-coded categories. All elements aligned to grid system. Title and legend at top. Composition emphasizes scientific organization and clarity.

**COMPONENTS:**
• Element boxes arranged in grid (rows and columns)
• Element symbols (chemical abbreviations)
• Atomic numbers
• Element names
• Color-coded categories (metals, nonmetals, noble gases, etc.)
• Legend explaining color coding
• Title and header information
• Group and period labels
• Lanthanide and actinide series (if included)

**STYLE:** Clean modern scientific typography. Color-coded categories with distinct colors. Professional scientific chart aesthetic. High contrast for readability. Systematic organization. Educational poster style. Clear, functional design.

**CONSTRAINTS:**
• Strict grid alignment - all elements must align perfectly
• Color coding must be consistent throughout
• All text must be sharp and readable
• No overlapping elements
• Maintain periodic table standard organization
• Preserve scientific accuracy
• Color-coded categories must be clearly distinct
• All element information must be accurate

**SOURCE MATERIAL:** Periodic table of elements, scientific chart design, educational poster standards, chemistry education materials.

**INTERPRETATION:** Emphasize scientific accuracy and clarity. Prioritize systematic organization and readability over decorative elements. If ambiguous, favor standard periodic table organization and clear color coding.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e10/800/600',
  },
  {
    id: 'e11',
    title: 'Transit Map',
    category: 'Educational',
    description: 'Colored lines, nodes, abstract geography, Harry Beck style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Transit system map in Tube Map style (standard transit map format, variable size, landscape orientation).

**LAYOUT:** Abstract geographic representation with transit lines. Colored lines representing different routes. Station nodes at intersections. All elements arranged for clarity over geographic accuracy. Composition emphasizes route clarity and station connections. Reading flow follows transit lines.

**COMPONENTS:**
• Colored transit lines (each route in distinct color)
• Station nodes (circles or dots at stations)
• Station names (labels at nodes)
• Intersection points where lines meet
• Transfer stations (larger nodes or special markers)
• Background elements (if any) supporting clarity
• Legend explaining line colors
• Title and system information

**STYLE:** Tube Map style (Harry Beck's London Underground tradition). 45-degree angles only for lines. Bright color-coded lines for each route. Distinct station nodes. Abstract geography (not to scale). High contrast for readability. Clean, systematic design. Functional transit map aesthetic.

**CONSTRAINTS:**
• Lines must use 45-degree angles only (or horizontal/vertical)
• Color coding must be consistent and distinct
• Station nodes must be clearly visible
• No overlapping station names
• Abstract geography - clarity over accuracy
• Maintain tube map visual language
• All text must be readable
• Preserve clean, systematic aesthetic

**SOURCE MATERIAL:** Harry Beck's London Underground map, transit map design tradition, wayfinding design, abstract cartography, public transportation graphics.

**INTERPRETATION:** Emphasize route clarity and station connections. Prioritize abstract, simplified geography over realistic representation. If ambiguous, favor clear transit system organization over geographic accuracy.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e11/800/600',
  },
  {
    id: 'e12',
    title: 'Architectural Sketch',
    category: 'Educational',
    description: 'Pencil lines, markers, perspective construction lines.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Architectural concept sketch (standard sketchbook format, approximately 11" x 14" or similar, portrait or landscape orientation).

**LAYOUT:** Perspective drawing with construction lines visible. Main architectural subject. Human scale figures for reference. All elements arranged to show architectural concept and scale. Composition emphasizes design process and spatial understanding.

**COMPONENTS:**
• Main architectural structure or building
• Perspective construction lines (visible)
• Vanishing points (may be marked)
• Human scale figures for reference
• Environmental context (ground, sky, surrounding elements)
• Architectural details and features
• Shadow and depth indicators
• Annotations or notes (if any)

**STYLE:** Architectural concept sketch style. Marker and loose pencil technique. Visible construction lines showing perspective process. Perspective vanishing points indicated. Human scale figures for reference. Sketchy, process-oriented aesthetic. Professional architectural drawing tradition. Design development stage.

**CONSTRAINTS:**
• Construction lines must be visible (not erased)
• Perspective must be accurate
• Human scale figures must be proportional
• Maintain architectural drawing standards
• Sketchy quality is intentional
• Preserve design process aesthetic
• All architectural elements must be clear
• Scale relationships must be accurate

**SOURCE MATERIAL:** Architectural sketching tradition, concept design drawings, perspective drawing techniques, architectural education, design process documentation.

**INTERPRETATION:** Emphasize design process and spatial understanding. Prioritize perspective accuracy and scale relationships over finished rendering. If ambiguous, favor visible construction process and architectural clarity over polished presentation.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e12/800/600',
  },
  {
    id: 'e13',
    title: 'Taxonomy Chart',
    category: 'Educational',
    description: 'Grid of species, scientific names, detailed illustrations.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Educational taxonomy poster (standard educational poster format, approximately 24" x 36" or similar, portrait or landscape orientation).

**LAYOUT:** Grid layout with species arranged systematically. Each grid cell contains one species. Labels with scientific names. All elements aligned to grid system. Title and header information. Composition emphasizes scientific organization and species comparison.

**COMPONENTS:**
• Grid of species illustrations (multiple rows and columns)
• Realistic illustrations of each species
• Scientific names (Latin binomials) for each species
• Common names (if included)
• Category labels or groupings
• Title and header information
• Legend or key (if needed)
• Border or frame elements

**STYLE:** Encyclopedia plate aesthetic. Realistic illustrations of species (insects, birds, plants, etc.). Scientific accuracy in all details. Latin labels with proper formatting. Professional scientific illustration. High detail and accuracy. Educational poster presentation.

**CONSTRAINTS:**
• Grid alignment must be perfect
• Scientific names must be accurate and properly formatted
• Species illustrations must be scientifically accurate
• No overlapping labels
• Maintain consistent illustration style throughout
• Preserve scientific accuracy
• All text must be readable
• Color must be accurate for species identification

**SOURCE MATERIAL:** Scientific taxonomy, natural history illustration, encyclopedia plates, species documentation, educational biology materials.

**INTERPRETATION:** Emphasize scientific accuracy and species identification. Prioritize taxonomic organization and clear species representation over aesthetic appeal. If ambiguous, favor accurate scientific illustration and proper taxonomic labeling.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e13/800/600',
  },
  {
    id: 'e14',
    title: 'Patent Drawing',
    category: 'Educational',
    description: 'Black ink, stippling, reference numbers, formal.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** US Patent Document illustration (standard patent format, approximately 8.5" x 11" or similar, portrait orientation).

**LAYOUT:** Technical illustration with multiple views if needed. Reference numbers clearly positioned. All elements arranged for patent documentation clarity. Composition emphasizes technical accuracy and legal documentation standards.

**COMPONENTS:**
• Main invention or object illustration
• Multiple views (if applicable - front, side, top, etc.)
• Reference numbers for parts
• Stippling for shading and texture
• Dimension lines (if measurements included)
• Title or figure number
• Border or frame
• Technical annotations

**STYLE:** Patent illustration style. Black ink on white background. Stippling technique for shading and texture. Numbered reference parts. Formal line work. Professional technical drawing. High contrast black and white. Legal documentation aesthetic. Precise, accurate rendering.

**CONSTRAINTS:**
• Black ink only on white background
• Stippling must be consistent in technique
• Reference numbers must be clearly readable
• No overlapping reference numbers
• Maintain patent drawing standards
• Formal line work - no loose sketches
• Preserve legal documentation aesthetic
• All parts must be clearly numbered

**SOURCE MATERIAL:** US Patent Office standards, patent illustration tradition, technical documentation, legal drawing requirements, formal technical illustration.

**INTERPRETATION:** Emphasize technical accuracy and legal documentation standards. Prioritize clear part identification and formal presentation over aesthetic appeal. If ambiguous, favor precise patent drawing standards and clear reference numbering.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e14/800/600',
  },
  {
    id: 'e15',
    title: 'Courtroom Sketch',
    category: 'Educational',
    description: 'Pastel, quick gestures, capturing likeness and mood.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Courtroom sketch (standard sketch format, approximately 11" x 14" or similar, portrait or landscape orientation).

**LAYOUT:** Courtroom scene with figures and setting. Central focus on key figures (judge, lawyers, defendant, etc.). Background elements suggesting courtroom. All elements arranged to capture moment and mood. Composition emphasizes human drama and legal proceedings.

**COMPONENTS:**
• Key figures (judge, lawyers, defendant, witnesses, jury)
• Courtroom setting (bench, tables, witness stand)
• Facial expressions and body language
• Gestural elements showing movement or emotion
• Background elements (courtroom architecture, observers)
• Atmospheric elements supporting mood
• Quick gesture lines
• Focus on likeness and expression

**STYLE:** Courtroom sketch aesthetic. Pastel on toned paper (beige, gray, or similar). Quick gestural lines capturing movement. Focus on facial expressions and body language. Loose, immediate technique. Documentary illustration style. Capturing moment and mood. Professional courtroom sketching tradition.

**CONSTRAINTS:**
• Quick gestures are intentional - maintain loose technique
• Likeness must be recognizable despite gestural style
• Facial expressions must be clear
• Pastel technique - no heavy opaque coverage
• Maintain courtroom sketch aesthetic
• Preserve immediate, documentary quality
• Body language should convey mood
• No overly finished rendering - favor gestural immediacy

**SOURCE MATERIAL:** Courtroom sketching tradition, legal illustration, documentary art, gesture drawing, quick portrait techniques.

**INTERPRETATION:** Emphasize likeness and mood capture. Prioritize immediate, gestural technique over polished rendering. If ambiguous, favor expressive, documentary style over formal portraiture.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/e15/800/600',
  },

  // --- 3D & CRAFT ---
  {
    id: 'd1',
    title: 'Claymation (Aardman)',
    category: '3D & Craft',
    description: 'Plasticine texture, fingerprints visible, goofy eyes.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Stop-motion still photograph in claymation style (standard photography format, portrait or landscape orientation).

**LAYOUT:** Character or scene composition with claymation figures. Central subject with supporting elements. Background elements supporting narrative. All elements arranged to showcase claymation aesthetic. Composition emphasizes character and craft technique.

**COMPONENTS:**
• Claymation character(s) in pose
• Visible plasticine texture throughout
• Fingerprints and tool marks visible on surface
• Rounded, organic forms
• Wide, expressive eyes
• Supporting props or environment
• Background elements (if any) supporting scene
• Shallow depth of field effect

**STYLE:** Claymation / Aardman style (Wallace and Gromit tradition). Plasticine texture visible on all surfaces. Visible fingerprints and tool marks. Rounded, organic forms. Wide, goofy eyes with character. Shallow depth of field (blurred background). Stop-motion photography aesthetic. Hand-crafted, tactile quality.

**CONSTRAINTS:**
• Plasticine texture must be visible throughout
• Fingerprints and tool marks are intentional - don't smooth them
• Rounded forms - no sharp geometric edges
• Wide eyes must be characteristic of style
• Shallow depth of field - background should be blurred
• Maintain claymation visual language
• Preserve hand-crafted, tactile aesthetic
• No overly polished digital rendering

**SOURCE MATERIAL:** Aardman Animations (Wallace and Gromit), stop-motion claymation, plasticine animation, hand-crafted character design.

**INTERPRETATION:** Emphasize hand-crafted, tactile quality. Prioritize claymation character and texture over realistic rendering. If ambiguous, favor visible craft process and organic, rounded forms over polished digital aesthetics.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d1/800/600',
  },
  {
    id: 'd2',
    title: 'Paper Cutout (Diorama)',
    category: '3D & Craft',
    description: 'Layered paper, depth shadows, craft aesthetic.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Papercraft diorama illustration (standard illustration format, variable size, portrait or landscape orientation).

**LAYOUT:** Layered composition showing depth through paper layers. Foreground, midground, and background layers. All elements arranged to create diorama effect. Composition emphasizes depth and layering technique.

**COMPONENTS:**
• Multiple paper layers creating depth
• Foreground elements (closest layer)
• Midground elements (middle layers)
• Background elements (farthest layer)
• Deep shadows between layers
• Paper grain texture visible
• Cut edges showing paper construction
• Vibrant colors on each layer

**STYLE:** Layered paper cutout diorama style. Deep shadows between layers creating depth. Paper grain texture visible. Vibrant colors on each layer. Cut edges showing paper construction. Craft aesthetic. Hand-made, artisanal quality. Diorama effect with dimensional depth.

**CONSTRAINTS:**
• Layers must be clearly separated with shadows
• Paper grain texture must be visible
• Cut edges should show paper construction
• Vibrant colors on each distinct layer
• Maintain diorama depth effect
• Preserve craft aesthetic
• No smooth digital blending - favor paper layers
• Shadows between layers are crucial for depth

**SOURCE MATERIAL:** Papercraft diorama tradition, layered paper art, craft techniques, dimensional paper construction, artisanal paper art.

**INTERPRETATION:** Emphasize craft technique and dimensional depth. Prioritize visible paper layers and shadows over seamless integration. If ambiguous, favor hand-crafted, layered aesthetic over smooth digital rendering.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d2/800/600',
  },
  {
    id: 'd3',
    title: 'Low Poly Isometric',
    category: '3D & Craft',
    description: 'Video game style, flat shading, geometric triangles.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** 3D render in low poly isometric style (digital format, standard screen dimensions, isometric view).

**LAYOUT:** Isometric composition with low poly 3D objects. Multiple elements arranged in isometric space. All elements aligned to isometric grid. Composition emphasizes geometric simplicity and isometric perspective.

**COMPONENTS:**
• Low poly 3D objects or scenes
• Visible triangular mesh on all surfaces
• Flat shading (no gradients)
• Isometric camera angle (30-degree perspective)
• Geometric forms (triangles, polygons)
• Pastel color palette
• Simple, clean geometry
• Isometric grid alignment

**STYLE:** Low Poly art style. Visible triangular mesh on all surfaces. Flat shading with no gradients or smooth transitions. Pastel color palette. Isometric camera view (consistent 30-degree angle). Video game aesthetic. Geometric simplicity. Clean, modern 3D style.

**CONSTRAINTS:**
• Visible triangular mesh - no smooth surfaces
• Flat shading only - no gradients or smooth color transitions
• Isometric angle must be consistent (30-degree perspective)
• Pastel colors - no vibrant or saturated palettes
• Geometric forms only - no organic curves
• Maintain low poly visual language
• Preserve video game aesthetic
• All elements must align to isometric grid

**SOURCE MATERIAL:** Low poly 3D art, isometric game design, geometric 3D modeling, video game aesthetics, modern 3D illustration.

**INTERPRETATION:** Emphasize geometric simplicity and isometric perspective. Prioritize low poly aesthetic and flat shading over realistic 3D rendering. If ambiguous, favor geometric, angular forms and pastel colors over organic shapes and vibrant palettes.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d3/800/600',
  },
  {
    id: 'd4',
    title: 'Voxel Art (Minecraft)',
    category: '3D & Craft',
    description: 'Cubes only, pixelated textures, blocky.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** 3D Voxel render (digital format, standard screen dimensions, isometric or orthographic view).

**LAYOUT:** Voxel composition with blocky 3D objects. Elements arranged in voxel grid space. All objects made of cubes. Composition emphasizes blocky, pixelated aesthetic. Isometric or orthographic camera view.

**COMPONENTS:**
• Voxel objects (everything made of cubes)
• Pixelated textures on cube faces
• Blocky, cubic forms
• Voxel grid alignment
• Isometric or orthographic projection
• Tilt-shift effect (if applicable)
• Simple, blocky geometry
• Consistent voxel scale

**STYLE:** Voxel art (Minecraft, MagicaVoxel tradition). Everything made of cubes (voxels). Pixelated textures on cube faces. Blocky, cubic aesthetic. Orthographic or isometric projection. Tilt-shift effect for depth. MagicaVoxel aesthetic. Game-like, blocky quality.

**CONSTRAINTS:**
• Everything must be made of cubes - no smooth forms
• Pixelated textures on cube faces
• Blocky aesthetic - no curves or organic shapes
• Voxel grid alignment must be maintained
• Consistent voxel scale throughout
• Maintain voxel art visual language
• Preserve blocky, game-like aesthetic
• No smooth 3D rendering - favor cubic blocks

**SOURCE MATERIAL:** Voxel art tradition, Minecraft aesthetics, MagicaVoxel software, block-based 3D art, pixel art in 3D.

**INTERPRETATION:** Emphasize blocky, cubic aesthetic. Prioritize voxel grid alignment and pixelated textures over smooth 3D rendering. If ambiguous, favor cubic, blocky forms and game-like aesthetics over realistic 3D models.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d4/800/600',
  },
  {
    id: 'd5',
    title: 'Felt / Wool',
    category: '3D & Craft',
    description: 'Fuzzy texture, needle felting style, soft edges.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Macro photography of needle felting craft (standard photography format, close-up or macro view, portrait or square orientation).

**LAYOUT:** Close-up composition emphasizing texture and craft. Central felted object or detail. Background supporting texture showcase. All elements arranged to maximize texture visibility. Composition emphasizes tactile quality and craft technique.

**COMPONENTS:**
• Felted wool object or detail
• Fuzzy wool texture throughout
• Stray fibers visible
• Soft, rounded shapes
• Needle felting technique visible
• Warm, natural lighting
• Textural details (wool fibers, felted surface)
• Craft material quality

**STYLE:** Needle felting craft photography. Fuzzy wool texture with visible fibers. Stray fibers adding to texture. Soft shapes with no sharp edges. Warm, natural lighting enhancing texture. Macro photography detail. Hand-crafted, artisanal quality. Tactile, soft aesthetic.

**CONSTRAINTS:**
• Fuzzy texture must be visible throughout
• Stray fibers are intentional - don't remove them
• Soft edges - no sharp, defined boundaries
• Warm lighting to enhance texture
• Maintain needle felting aesthetic
• Preserve hand-crafted quality
• No smooth, polished surfaces
• Texture should be the focus

**SOURCE MATERIAL:** Needle felting craft, wool fiber art, textile crafts, macro craft photography, artisanal fiber work.

**INTERPRETATION:** Emphasize texture and hand-crafted quality. Prioritize fuzzy, tactile aesthetic over smooth, polished rendering. If ambiguous, favor visible wool texture and soft, organic forms over defined, geometric shapes.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d5/800/600',
  },
  {
    id: 'd6',
    title: 'Origami',
    category: '3D & Craft',
    description: 'Folded paper, geometric creases, sharp edges.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Product photography of origami (standard photography format, portrait or square orientation, clean background).

**LAYOUT:** Central origami object with clean background. Multiple angles or single clear view. All elements arranged to showcase folding technique. Composition emphasizes geometric precision and paper construction.

**COMPONENTS:**
• Folded origami object (animal, geometric shape, or design)
• Crisp, sharp creases showing folds
• Geometric abstraction through folding
• Paper texture visible
• Clean, simple background
• Single sheet constraint (no cuts or multiple pieces)
• Shadow for depth (if applicable)
• Folding pattern visible

**STYLE:** Origami photography. Folded paper construction with crisp creases. Geometric abstraction through folding. Single sheet constraint (traditional origami). Sharp, defined edges. Paper texture visible. Clean product photography aesthetic. Precise, mathematical folding.

**CONSTRAINTS:**
• Crisp creases must be clearly visible
• Geometric folding - no organic, curved folds
• Single sheet only - no cuts or multiple pieces
• Sharp edges - no soft, rounded forms
• Paper texture should be visible
• Maintain origami construction logic
• Preserve geometric precision
• Clean background to emphasize form

**SOURCE MATERIAL:** Origami tradition, paper folding art, geometric paper construction, traditional Japanese paper art, mathematical folding.

**INTERPRETATION:** Emphasize geometric precision and folding technique. Prioritize crisp creases and mathematical folding over organic, curved forms. If ambiguous, favor geometric abstraction and sharp, defined edges over soft, rounded shapes.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d6/800/600',
  },
  {
    id: 'd7',
    title: 'Lego / Brick',
    category: '3D & Craft',
    description: 'Plastic bricks, studs visible, glossy plastic.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Macro toy photography of LEGO construction (standard photography format, close-up or macro view, portrait or landscape orientation).

**LAYOUT:** LEGO construction composition with visible brick details. Central subject or scene. Background supporting toy photography aesthetic. All elements arranged to showcase brick construction and toy quality.

**COMPONENTS:**
• LEGO brick construction (buildings, vehicles, figures, or scenes)
• Visible studs on top of bricks
• Plastic gloss and shine
• Articulated minifigures (if included)
• Brick connections and seams visible
• Depth of field (sharp subject, blurred background)
• Toy photography lighting
• LEGO brand aesthetic

**STYLE:** LEGO brick construction photography. Plastic gloss and shine on bricks. Visible studs on top surfaces. Articulated minifigures with characteristic design. Depth of field for focus. Toy photography aesthetic. Bright, colorful palette. Professional product photography style.

**CONSTRAINTS:**
• Visible studs must be clear on brick tops
• Plastic gloss should be visible
• Maintain LEGO brick proportions
• Minifigures must follow LEGO design
• Depth of field - sharp subject, blurred background
• Preserve toy photography aesthetic
• Bright, colorful LEGO palette
• Brick connections should be visible

**SOURCE MATERIAL:** LEGO brand aesthetics, toy photography, brick construction, minifigure design, product photography of toys.

**INTERPRETATION:** Emphasize toy quality and brick construction. Prioritize LEGO brand aesthetic and visible construction details over realistic rendering. If ambiguous, favor bright, colorful toy photography and visible brick details over realistic, muted aesthetics.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d7/800/600',
  },
  {
    id: 'd8',
    title: 'Neon Glass Blowing',
    category: '3D & Craft',
    description: 'Glowing tubes, transparency, dark background.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Dark room photography of neon glass art (standard photography format, portrait or landscape orientation, dark background).

**LAYOUT:** Neon glass object as central focus. Dark background emphasizing glow. All elements arranged to showcase glass transparency and neon glow. Composition emphasizes light and transparency effects.

**COMPONENTS:**
• Neon glass object (sculpture, sign, or art piece)
• Glowing gas-filled tubes
• Glass transparency and reflections
• Dark, cinematic background
• Light refraction through glass
• Neon glow effects
• Glass surface reflections
• Atmospheric lighting

**STYLE:** Neon glass art photography. Glowing gas tubes with vibrant colors. Glass transparency showing internal structure. Reflections on glass surfaces. Dark, cinematic background. Light refraction effects. Neon glow creating atmosphere. Professional art photography aesthetic.

**CONSTRAINTS:**
• Neon glow must be vibrant and visible
• Glass transparency should show internal structure
• Dark background to emphasize glow
• Reflections on glass surfaces
• Light refraction through glass
• Maintain neon glass aesthetic
• Preserve cinematic, dramatic lighting
• No bright, distracting backgrounds

**SOURCE MATERIAL:** Neon art, glass blowing techniques, neon sign aesthetics, art photography, light-based sculpture.

**INTERPRETATION:** Emphasize neon glow and glass transparency. Prioritize dramatic lighting and dark background over bright, evenly lit scenes. If ambiguous, favor vibrant neon colors and glass transparency effects over muted, opaque rendering.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d8/800/600',
  },
  {
    id: 'd9',
    title: 'Embroidery / Cross Stitch',
    category: '3D & Craft',
    description: 'Thread texture, fabric weave, stitched patterns.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Textile close-up photography of embroidery (standard photography format, macro or close-up view, portrait or square orientation).

**LAYOUT:** Close-up composition emphasizing textile texture. Central embroidered area or pattern. Fabric weave visible. All elements arranged to showcase embroidery technique and textile quality. Composition emphasizes texture and craft detail.

**COMPONENTS:**
• Embroidered pattern or design
• Visible thread texture and individual stitches
• Fabric weave background
• Satin stitch volume and texture
• Cross stitch pattern (if applicable)
• Thread colors and variations
• Needle holes and stitch details
• Textile surface texture

**STYLE:** Embroidery and cross stitch photography. Visible thread texture showing individual fibers. Fabric weave background clearly visible. Satin stitch creating volume and texture. Cross stitch patterns with clear grid. Textile craft aesthetic. Macro photography detail. Hand-stitched quality.

**CONSTRAINTS:**
• Thread texture must be visible
• Fabric weave should be clear
• Individual stitches must be identifiable
• Maintain embroidery/cross stitch technique accuracy
• Preserve textile craft aesthetic
• No smooth, digital rendering - favor textile texture
• Stitch patterns should be clear
• Hand-stitched quality must be evident

**SOURCE MATERIAL:** Embroidery tradition, cross stitch patterns, textile crafts, hand-stitching techniques, fiber art photography.

**INTERPRETATION:** Emphasize textile texture and stitching technique. Prioritize visible thread and fabric details over smooth, polished rendering. If ambiguous, favor hand-stitched, textile craft aesthetic over digital, smooth surfaces.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d9/800/600',
  },
  {
    id: 'd10',
    title: 'Ceramic / Porcelain',
    category: '3D & Craft',
    description: 'Glazed surface, cracks, painted patterns, fragile.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Studio pottery photography (standard photography format, portrait or landscape orientation, clean studio background).

**LAYOUT:** Ceramic object as central focus. Clean background emphasizing form. All elements arranged to showcase ceramic technique and surface details. Composition emphasizes form, glaze, and craft quality.

**COMPONENTS:**
• Ceramic or porcelain object (vessel, sculpture, or functional piece)
• Glazed surface with shine
• Hand-painted patterns (if applicable - blue and white porcelain style)
• Kintsugi gold cracks (if applicable)
• Surface texture and glaze quality
• Form and shape details
• Studio lighting
• Clean background

**STYLE:** Blue and white porcelain aesthetic (or ceramic style). Glossy glaze surface. Hand-painted cobalt patterns (if applicable). Kintsugi gold cracks showing repair (if applicable). Ceramic craft photography. Professional studio aesthetic. Form and surface emphasis.

**CONSTRAINTS:**
• Glaze surface must show shine and reflection
• Hand-painted patterns must be clear (if applicable)
• Kintsugi cracks should be visible with gold (if applicable)
• Maintain ceramic craft aesthetic
• Preserve fragile, delicate quality
• Surface texture should be visible
• Clean background to emphasize form
• No distracting elements

**SOURCE MATERIAL:** Ceramic and porcelain tradition, blue and white porcelain, kintsugi repair technique, pottery photography, ceramic craft aesthetics.

**INTERPRETATION:** Emphasize ceramic form and surface quality. Prioritize glaze details and craft technique over decorative complexity. If ambiguous, favor clean, elegant ceramic aesthetics and visible craft quality over ornate, busy designs.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d10/800/600',
  },
  {
    id: 'd11',
    title: 'Quilling Paper Art',
    category: '3D & Craft',
    description: 'Rolled paper strips, intricate spirals, edge-on view.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Macro photography of quilling paper art (standard photography format, macro or close-up view, portrait or square orientation).

**LAYOUT:** Close-up composition emphasizing quilling technique. Central quilled design or pattern. Edge-on view showing paper strip depth. All elements arranged to showcase paper coiling and quilling technique. Composition emphasizes texture and craft detail.

**COMPONENTS:**
• Quilled paper design or pattern
• Coiled strips of colorful paper
• Edge-on view showing paper strip depth
• Intricate spirals and coils
• Shadow depth between layers
• Paper texture visible
• Color variations in paper strips
• Quilling technique details

**STYLE:** Quilling paper art photography. Coiled strips of colorful paper. Edge-on arrangement showing dimensional depth. Intricate spirals and coil patterns. Shadow depth between paper layers. Paper texture visible. Hand-crafted, artisanal quality. Detailed, precise coiling.

**CONSTRAINTS:**
• Coiled paper strips must be clearly visible
• Edge-on view to show depth
• Intricate spirals should be detailed
• Shadow depth between layers
• Paper texture must be visible
• Maintain quilling technique accuracy
• Preserve hand-crafted aesthetic
• Color variations should be clear

**SOURCE MATERIAL:** Quilling paper art tradition, paper coiling techniques, paper craft, dimensional paper art, artisanal paper work.

**INTERPRETATION:** Emphasize paper coiling technique and dimensional depth. Prioritize edge-on view and visible paper strips over flat, two-dimensional rendering. If ambiguous, favor intricate spirals and visible paper texture over smooth, simplified forms.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d11/800/600',
  },
  {
    id: 'd12',
    title: 'Ice Carving',
    category: '3D & Craft',
    description: 'Transparent, refractive, cold lighting, melting drips.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Winter festival photography of ice sculpture (standard photography format, portrait or landscape orientation, winter/outdoor setting).

**LAYOUT:** Ice sculpture as central focus. Winter environment context. All elements arranged to showcase ice transparency and carving technique. Composition emphasizes cold atmosphere and ice quality.

**COMPONENTS:**
• Ice sculpture (carved figure, design, or object)
• High transparency showing internal structure
• Light refraction through ice
• Cold blue LED lighting (if applicable)
• Smooth melting edges
• Winter environment context
• Atmospheric elements (snow, cold air)
• Ice surface details and carving marks

**STYLE:** Ice sculpture photography. High transparency with visible internal structure. Light refraction creating optical effects. Cold blue LED lighting enhancing ice quality. Smooth melting edges showing natural ice behavior. Winter festival aesthetic. Cold, crystalline atmosphere.

**CONSTRAINTS:**
• High transparency - internal structure must be visible
• Light refraction effects through ice
• Cold lighting - blue tones, not warm
• Smooth melting edges - natural ice behavior
• Maintain ice sculpture aesthetic
• Preserve cold, crystalline atmosphere
• No warm lighting - favor cold blue tones
• Transparency is crucial

**SOURCE MATERIAL:** Ice carving tradition, winter festival art, ice sculpture techniques, cold climate art, transparent material photography.

**INTERPRETATION:** Emphasize ice transparency and cold atmosphere. Prioritize light refraction and crystalline quality over opaque, solid rendering. If ambiguous, favor cold blue lighting and transparent ice effects over warm, opaque materials.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d12/800/600',
  },
  {
    id: 'd13',
    title: 'Wood Carving',
    category: '3D & Craft',
    description: 'Grain texture, chisel marks, warm varnish.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Studio photography of hand-carved wood (standard photography format, portrait or landscape orientation, studio lighting).

**LAYOUT:** Carved wood object as central focus. Clean background emphasizing wood texture. All elements arranged to showcase carving technique and wood grain. Composition emphasizes texture and craft detail.

**COMPONENTS:**
• Hand-carved wood object (sculpture, functional piece, or decorative)
• Visible wood grain direction
• Chisel tool marks showing carving process
• Warm oak varnish or wood finish
• Carving details and texture
• Wood surface quality
• Studio lighting
• Clean background

**STYLE:** Hand-carved wood craft photography. Visible grain direction showing wood structure. Chisel tool marks visible from carving process. Warm oak varnish or natural wood finish. Rustic, artisanal feel. Professional craft photography. Natural wood aesthetic.

**CONSTRAINTS:**
• Wood grain must be clearly visible
• Chisel marks should show carving process
• Warm varnish or wood finish
• Maintain wood carving aesthetic
• Preserve rustic, artisanal quality
• Tool marks are intentional - don't smooth them
• Natural wood colors - warm tones
• Surface texture should be evident

**SOURCE MATERIAL:** Wood carving tradition, hand-crafted woodwork, artisanal wood craft, traditional carving techniques, natural wood aesthetics.

**INTERPRETATION:** Emphasize wood grain and carving technique. Prioritize visible tool marks and natural wood quality over polished, smooth surfaces. If ambiguous, favor rustic, hand-carved aesthetic with visible grain and tool marks over machine-finished, smooth wood.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d13/800/600',
  },
  {
    id: 'd14',
    title: 'Amigurumi Crochet',
    category: '3D & Craft',
    description: 'Knitted loops, cute proportions, yarn texture.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Macro photography of amigurumi crochet (standard photography format, close-up or macro view, portrait or square orientation).

**LAYOUT:** Amigurumi character or object as central focus. Close-up emphasizing yarn texture. All elements arranged to showcase crochet technique and cute proportions. Composition emphasizes texture and character design.

**COMPONENTS:**
• Amigurumi crochet character or object
• Visible yarn loops showing crochet stitches
• Cute chibi proportions (large head, small body)
• Button eyes or embroidered features
• Soft fuzz and yarn texture
• Crochet stitch pattern visible
• Yarn color and texture
• Hand-crafted quality

**STYLE:** Amigurumi crochet photography. Visible yarn loops showing individual crochet stitches. Cute chibi proportions (exaggerated cuteness). Button eyes or embroidered facial features. Soft fuzz from yarn texture. Hand-crafted, artisanal quality. Cute, kawaii aesthetic.

**CONSTRAINTS:**
• Yarn loops must be visible
• Cute proportions - large head, small body
• Button eyes or embroidered features
• Soft fuzz is intentional
• Maintain amigurumi aesthetic
• Preserve hand-crafted quality
• Cute, kawaii style - not realistic
• Yarn texture should be evident

**SOURCE MATERIAL:** Amigurumi crochet tradition, Japanese kawaii culture, crochet techniques, cute character design, yarn craft aesthetics.

**INTERPRETATION:** Emphasize cute proportions and yarn texture. Prioritize amigurumi character design and visible crochet technique over realistic representation. If ambiguous, favor cute, chibi proportions and visible yarn loops over realistic, smooth rendering.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d14/800/600',
  },
  {
    id: 'd15',
    title: 'Stained Glass',
    category: '3D & Craft',
    description: 'Lead cames, colored light transmission, glowing.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Stained glass window design (standard window format, variable size, portrait orientation, designed for light transmission).

**LAYOUT:** Stained glass panel composition with lead lines dividing sections. Colored glass sections. All elements arranged to create cohesive design when backlit. Composition emphasizes light transmission and color interaction.

**COMPONENTS:**
• Colored glass sections (multiple colors)
• Black lead outlines (cames) dividing sections
• Stained glass design or pattern
• Light transmission through colored glass
• Glass transparency and glow
• Decorative elements (if any)
• Border or frame elements
• Light source behind (simulated or actual)

**STYLE:** Stained glass window design. Black lead outlines (cames) creating divisions. Vibrant translucent glass sections. Light transmission creating glow effect. Traditional stained glass technique. Color interaction through overlapping or adjacent sections. Decorative, ornamental design.

**CONSTRAINTS:**
• Black lead cames must clearly divide sections
• Colored glass must be translucent, not opaque
• Light transmission glow effect
• Maintain stained glass visual language
• Preserve traditional technique aesthetic
• Color sections should be distinct
• Lead lines must be consistent
• Light transmission is crucial

**SOURCE MATERIAL:** Stained glass tradition, Gothic cathedral windows, traditional glass art, lead came technique, light-based art.

**INTERPRETATION:** Emphasize light transmission and color interaction. Prioritize translucent glass sections and lead line divisions over opaque, solid rendering. If ambiguous, favor traditional stained glass technique with visible lead cames and glowing color sections over modern, seamless glass designs.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/d15/800/600',
  },

  // --- UI & DESIGN ---
  {
    id: 'u1',
    title: 'SaaS Dashboard',
    category: 'Design & UI',
    description: 'Clean data visualization, charts, KPIs, grid layout.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** A modern SaaS dashboard interface designed for desktop viewing (16:9 aspect ratio, 1920x1080 resolution).

**LAYOUT:** 3-column grid layout with consistent margins. Left sidebar (250px width) for navigation. Main content area divided into two columns (60/40 split). Top header bar (80px height) with user profile and notifications. Grid system with 12-column baseline for responsive alignment. All elements aligned to 8px grid system.

**COMPONENTS:**
• Left sidebar: Logo, navigation menu items, user profile section
• Top header: Search bar, notifications icon, user avatar dropdown
• Main column 1: KPI cards (4 cards in 2x2 grid), line chart widget, data table
• Main column 2: Pie chart, activity feed, quick action buttons
• Footer: Status indicators, copyright text
• Icons: Consistent icon set for all navigation and actions
• Typography: Headings (H1-H4), body text, labels, numbers

**STYLE:** Modern SaaS design. Clean, minimalist aesthetic. Flat design with subtle shadows. Professional color palette (blues, grays, white). Modern sans-serif typography (Inter or similar). Subtle gradients on cards. Clean data visualization style. High contrast for readability.

**CONSTRAINTS:**
• No overlapping UI elements
• Uniform spacing between all components (16px standard)
• All text must remain sharp and readable at all sizes
• Consistent icon style throughout
• Maintain 8px grid alignment
• Color-coded data visualizations must be accessible (WCAG AA contrast)
• Responsive breakpoints considered in layout

**SOURCE MATERIAL:** Modern SaaS dashboard patterns (Stripe, Notion, Linear style), data visualization best practices, UI/UX design systems.

**INTERPRETATION:** Prioritize clarity and usability. Emphasize data readability over decorative elements. If ambiguous, favor functional design over aesthetic flourishes.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u1/800/600',
  },
  {
    id: 'u2',
    title: 'Neomorphism',
    category: 'Design & UI',
    description: 'Soft shadows, low contrast, plastic look, extruded shapes.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Mobile app UI screen in neomorphic style (standard mobile screen format, approximately 9:16 aspect ratio, portrait orientation).

**LAYOUT:** UI elements arranged on off-white background. Buttons and cards appear extruded from surface. Soft shadows creating depth. All elements arranged for neomorphic aesthetic. Composition emphasizes subtle depth and soft appearance.

**COMPONENTS:**
• UI buttons or cards with soft shadows
• Off-white or light gray background
• Extruded elements appearing to rise from surface
• Soft inner and outer shadows
• Low contrast color palette
• Text elements on neomorphic surfaces
• Icons or graphics with neomorphic treatment
• Subtle depth and dimension

**STYLE:** Neomorphism design style. Soft shadows (both inner and outer) creating subtle depth. Off-white background (not pure white). Low contrast throughout. Elements appear extruded from surface. Plastic-like appearance. Minimal, soft aesthetic. Modern UI design trend.

**CONSTRAINTS:**
• Soft shadows only - no harsh, defined shadows
• Low contrast - no high contrast elements
• Off-white background - not pure white
• Extruded appearance - elements should appear to rise from surface
• Maintain neomorphic visual language
• Preserve soft, minimal aesthetic
• No bright colors - favor muted, low contrast palette
• Shadows must be subtle, not dramatic

**SOURCE MATERIAL:** Neomorphism design trend, soft UI design, modern mobile interfaces, subtle depth techniques, contemporary UI aesthetics.

**INTERPRETATION:** Emphasize soft, subtle depth and low contrast. Prioritize extruded appearance and soft shadows over dramatic, high-contrast design. If ambiguous, favor soft, minimal neomorphic aesthetic over bold, high-contrast interfaces.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u2/800/600',
  },
  {
    id: 'u3',
    title: 'Glassmorphism',
    category: 'Design & UI',
    description: 'Frosted glass, transparency, background blur, vivid colors.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** UI Card component in glassmorphic style (standard UI component format, variable size, portrait or landscape orientation).

**LAYOUT:** Glassmorphic card or panel with blurred background visible through. Vivid background colors or orbs. All elements arranged to showcase glass effect. Composition emphasizes transparency and blur effects.

**COMPONENTS:**
• Glassmorphic card or panel
• Frosted glass effect with transparency
• Background blur (backdrop filter effect)
• Vivid background colors or gradient orbs
• White or light transparency overlay
• Text or content on glass surface
• Border or edge highlights
• Depth through transparency layers

**STYLE:** Glassmorphism design style. Frosted glass effect with visible transparency. Background blur creating depth. White or light transparency overlay. Vivid background colors or gradient orbs. Modern, sleek aesthetic. iOS Big Sur / macOS Big Sur influence. Translucent, elegant appearance.

**CONSTRAINTS:**
• Frosted glass effect must be visible
• Background blur is crucial - background should be visible but blurred
• Transparency overlay - not fully opaque
• Vivid background colors to show through glass
• Maintain glassmorphic visual language
• Preserve modern, sleek aesthetic
• Border highlights for glass edge definition
• No solid, opaque backgrounds

**SOURCE MATERIAL:** Glassmorphism design trend, iOS Big Sur design, translucent UI elements, modern interface design, backdrop blur techniques.

**INTERPRETATION:** Emphasize transparency and blur effects. Prioritize frosted glass appearance and vivid background visibility over solid, opaque design. If ambiguous, favor translucent, glass-like aesthetic over solid, flat interfaces.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u3/800/600',
  },
  {
    id: 'u4',
    title: 'Retro 90s OS',
    category: 'Design & UI',
    description: 'Windows 95 style, bevels, grey backgrounds, pixel fonts.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Desktop OS Screenshot in Windows 95 style (standard desktop format, approximately 4:3 aspect ratio, landscape orientation).

**LAYOUT:** Desktop interface with taskbar, windows, and icons. Grey background. Beveled buttons and UI elements. All elements arranged following Windows 95 interface conventions. Composition emphasizes retro OS aesthetic.

**COMPONENTS:**
• Desktop background (grey or pattern)
• Taskbar at bottom
• Windows with beveled borders
• Beveled buttons (3D raised appearance)
• Pixelated icons
• Chicago 12pt font (or similar pixel font)
• Grey color palette
• Classic OS interface elements

**STYLE:** Windows 95 aesthetic. Beveled buttons with 3D raised appearance. Grey background (#C0C0C0 or similar). Chicago 12pt font or pixel fonts. Pixelated icons. Classic 1990s OS design. Retro computing aesthetic. Nostalgic, vintage interface design.

**CONSTRAINTS:**
• Beveled buttons - 3D raised appearance
• Grey background - classic Windows grey
• Pixel fonts - no smooth, modern fonts
• Pixelated icons - not high-resolution
• Maintain Windows 95 visual language
• Preserve retro OS aesthetic
• No modern UI elements
• Classic 1990s color palette

**SOURCE MATERIAL:** Windows 95 interface design, 1990s operating systems, retro computing aesthetics, classic OS design, vintage UI design.

**INTERPRETATION:** Emphasize retro OS aesthetic and beveled 3D elements. Prioritize Windows 95 visual language and pixel fonts over modern, smooth interfaces. If ambiguous, favor classic 1990s OS design and grey palette over contemporary, colorful interfaces.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u4/800/600',
  },
  {
    id: 'u5',
    title: 'Cyberpunk HUD',
    category: 'Design & UI',
    description: 'Neon wireframes, data streams, holographic, dark.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Heads Up Display (HUD) in cyberpunk style (standard HUD format, full screen overlay, landscape orientation).

**LAYOUT:** HUD overlay with multiple information panels. Wireframe elements. Data streams and information displays. All elements arranged for futuristic interface aesthetic. Composition emphasizes cyberpunk visual language and information density.

**COMPONENTS:**
• Neon wireframe terrain or objects
• Data streams (neon blue/pink flowing lines)
• Information panels and displays
• Glitch effects and digital artifacts
• Dark background (black or deep blue)
• Holographic UI elements
• Status indicators and metrics
• Futuristic typography

**STYLE:** Cyberpunk interface design. Neon blue/pink data streams. Wireframe terrain with neon outlines. Glitch effects and digital artifacts. Dark background (black or deep blue). Holographic, translucent appearance. Futuristic, high-tech aesthetic. Blade Runner, Matrix influence.

**CONSTRAINTS:**
• Neon colors - blue and pink primarily
• Wireframe elements with neon outlines
• Dark background - no bright backgrounds
• Glitch effects should be subtle, not overwhelming
• Maintain cyberpunk visual language
• Preserve futuristic, high-tech aesthetic
• Holographic appearance - translucent elements
• No warm, organic colors

**SOURCE MATERIAL:** Cyberpunk aesthetics, Blade Runner, Matrix interfaces, futuristic HUD design, sci-fi interface design, neon digital aesthetics.

**INTERPRETATION:** Emphasize neon colors and futuristic interface elements. Prioritize cyberpunk visual language and dark backgrounds over bright, friendly interfaces. If ambiguous, favor neon wireframes, data streams, and holographic effects over solid, opaque UI elements.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u5/800/600',
  },
  {
    id: 'u6',
    title: 'Swiss Style Poster',
    category: 'Design & UI',
    description: 'Grid systems, sans-serif, asymmetry, negative space.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Typographic poster in Swiss Style (standard poster format, approximately 19" x 27" or similar, portrait orientation).

**LAYOUT:** Grid-based composition with asymmetric balance. Typography as primary element. Generous negative space. All elements aligned to grid system. Composition emphasizes typography and systematic organization.

**COMPONENTS:**
• Typography (primary design element)
• Grid system (visible or implied)
• Asymmetric composition
• Generous negative space
• Sans-serif typography (Helvetica or similar)
• Minimal graphic elements (if any)
• Clear information hierarchy
• Systematic organization

**STYLE:** International Typographic Style (Swiss Style, 1950s-1960s). Grid-based layout with mathematical precision. Asymmetric balance. Helvetica or similar sans-serif font. Negative space as design element. Minimal, functional aesthetic. Objective, systematic design. Clean, professional presentation.

**CONSTRAINTS:**
• Grid alignment must be strict
• Asymmetric balance - no centered compositions
• Sans-serif typography only
• Generous negative space - don't fill entire surface
• Minimal elements - function over decoration
• Maintain Swiss Style visual language
• Preserve systematic, objective aesthetic
• No decorative elements

**SOURCE MATERIAL:** International Typographic Style (Swiss Style), 1950s-1960s graphic design, grid systems, Helvetica typography, systematic design principles.

**INTERPRETATION:** Emphasize typography and systematic organization. Prioritize grid alignment and asymmetric balance over decorative, centered compositions. If ambiguous, favor minimal, functional Swiss Style over ornate, decorative design.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u6/800/600',
  },
  {
    id: 'u7',
    title: 'App Store Screenshot',
    category: 'Design & UI',
    description: 'Device frame, marketing copy, tilted perspective.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** App Store marketing image (standard marketing format, approximately 16:9 aspect ratio, landscape orientation).

**LAYOUT:** Floating device frame with app interface visible. Tilted perspective for dynamism. Marketing copy or tagline. All elements arranged for product showcase. Composition emphasizes app presentation and marketing appeal.

**COMPONENTS:**
• Floating iPhone 15 Pro frame (or similar device)
• App interface visible on device screen
• Tilted perspective (3D rotation)
• Vibrant background gradient
• Marketing tagline or copy
• Product branding elements
• Depth and dimension through perspective
• Professional product photography aesthetic

**STYLE:** Product showcase marketing style. Floating device frame with realistic rendering. Tilted perspective creating 3D effect. Vibrant background gradient. Marketing tagline with typography. Professional product photography. Modern app store aesthetic. High-quality, polished presentation.

**CONSTRAINTS:**
• Device frame must be realistic and accurate
• Tilted perspective - not flat, front-on view
• Vibrant background - not plain or dull
• Marketing copy must be readable
• Maintain product showcase aesthetic
• Preserve professional, polished look
• Device should appear to float in space
• High-quality rendering required

**SOURCE MATERIAL:** App Store marketing images, product showcase photography, device mockups, modern marketing design, app promotion materials.

**INTERPRETATION:** Emphasize product presentation and marketing appeal. Prioritize tilted perspective and vibrant backgrounds over flat, static presentations. If ambiguous, favor dynamic, 3D product showcase over simple, flat device screenshots.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u7/800/600',
  },
  {
    id: 'u8',
    title: 'Game Inventory',
    category: 'Design & UI',
    description: 'RPG style, grid slots, item tooltips, fantasy frame.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** RPG Inventory Screen (standard game UI format, full screen or windowed, landscape orientation).

**LAYOUT:** Inventory panel with grid of item slots. Fantasy-themed frame and borders. Item tooltips on hover or selection. All elements arranged for game UI functionality. Composition emphasizes fantasy aesthetic and inventory organization.

**COMPONENTS:**
• Grid of item slots (inventory grid)
• Item icons in grid slots
• Fantasy frame with decorative borders (gold filigree)
• Parchment texture background
• Item tooltips with information
• Stat bars or character information
• Fantasy UI elements (scrolls, medieval design)
• Decorative elements supporting fantasy theme

**STYLE:** Fantasy RPG UI design. Parchment texture background. Gold filigree borders and decorative frames. Grid of item icons. Stat bars and character information. Medieval, fantasy aesthetic. Game UI design tradition. Rich, detailed fantasy presentation.

**CONSTRAINTS:**
• Grid alignment must be clear
• Fantasy frame with decorative elements
• Parchment texture should be visible
• Item icons must be clear and identifiable
• Maintain fantasy RPG visual language
• Preserve game UI functionality
• Gold filigree borders for fantasy frame
• No modern, minimalist UI elements

**SOURCE MATERIAL:** Fantasy RPG game interfaces, medieval UI design, game inventory systems, fantasy game aesthetics, role-playing game design.

**INTERPRETATION:** Emphasize fantasy aesthetic and game UI functionality. Prioritize decorative fantasy frames and parchment textures over modern, minimal interfaces. If ambiguous, favor rich, detailed fantasy RPG aesthetic over clean, contemporary UI design.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u8/800/600',
  },
  {
    id: 'u9',
    title: 'Vector Logo',
    category: 'Design & UI',
    description: 'Flat, scalable, minimal, negative space logo.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Brand Logo in vector style (standard logo format, square or rectangular, scalable vector format).

**LAYOUT:** Central logo mark or symbol. Typography (if included) integrated with mark. All elements arranged for brand recognition. Composition emphasizes simplicity and scalability. Negative space used strategically.

**COMPONENTS:**
• Logo mark or symbol
• Typography (wordmark, if included)
• Negative space elements
• Solid colors (no gradients)
• Geometric construction
• Minimal design elements
• Scalable vector format
• Brand identity focus

**STYLE:** Flat Vector logo design. Minimalist approach. Negative space utilization for clever design. Solid colors (no gradients or effects). Geometric construction. Scalable vector format. Professional brand identity. Clean, timeless aesthetic.

**CONSTRAINTS:**
• Flat design - no 3D effects or gradients
• Minimal elements - simplicity is key
• Negative space should be intentional and clever
• Solid colors only - no gradients
• Geometric construction - clean, precise
• Maintain scalability - works at any size
• Preserve minimalist aesthetic
• No decorative elements - function first

**SOURCE MATERIAL:** Modern logo design, vector graphics, brand identity design, minimalist design principles, scalable logo design.

**INTERPRETATION:** Emphasize simplicity and scalability. Prioritize minimal design and negative space over complex, detailed logos. If ambiguous, favor clean, geometric vector design over ornate, decorative branding.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u9/800/600',
  },
  {
    id: 'u10',
    title: 'Retro Calligram',
    category: 'Design & UI',
    description: 'Text forming image, 70s psychedelic, fluid type.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Typographic Illustration in 70s calligram style (standard illustration format, variable size, portrait or landscape orientation).

**LAYOUT:** Text warped and arranged to form image or silhouette. Text flows to create shape. All elements integrated to create calligram effect. Composition emphasizes typography as image.

**COMPONENTS:**
• Text warped to form silhouette or image
• Psychedelic color palette (bright, vibrant colors)
• Fluid typography with organic curves
• Text density creating image
• Background elements (if any) supporting calligram
• 70s aesthetic elements
• Typography as primary design element
• Organic, flowing text arrangement

**STYLE:** 70s Calligram typographic art. Text warped to form silhouette or image. Psychedelic colors (bright pinks, oranges, blues, greens). Fluid typography with organic curves. 1970s aesthetic. Typography as image-making tool. Retro, psychedelic design.

**CONSTRAINTS:**
• Text must form recognizable image or silhouette
• Psychedelic colors - bright, vibrant palette
• Fluid typography - organic, flowing curves
• 70s aesthetic - retro, psychedelic
• Maintain calligram visual language
• Preserve typography as image concept
• No rigid, geometric text - favor organic flow
• Text density creates image

**SOURCE MATERIAL:** Calligram tradition, 1970s typography, psychedelic design, typographic illustration, retro typography art.

**INTERPRETATION:** Emphasize typography as image-making tool. Prioritize fluid, organic text arrangement and psychedelic colors over rigid, geometric typography. If ambiguous, favor 70s aesthetic and text-formed imagery over modern, minimal typography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u10/800/600',
  },
  {
    id: 'u11',
    title: 'Brutalist Web Design',
    category: 'Design & UI',
    description: 'Raw, unstyled HTML look, web-safe fonts, high contrast.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Webpage mockup in brutalist style (standard web page format, approximately 16:9 aspect ratio, landscape orientation).

**LAYOUT:** Raw HTML-like layout with default browser styling. High contrast elements. Overlapping or intentionally misaligned elements. All elements arranged to challenge conventional web design. Composition emphasizes raw, unpolished aesthetic.

**COMPONENTS:**
• Default blue hyperlinks (#0000FF)
• Raw Courier font (monospace)
• High contrast borders and elements
• Overlapping text or elements
• Default browser styling
• Intentionally "ugly" or raw appearance
• Minimal or no CSS styling
• Raw HTML aesthetic

**STYLE:** Digital Brutalism web design. Default blue links (web-safe colors). Raw Courier monospace font. High contrast borders. Overlapping elements. Intentionally ugly or raw appearance. Challenges conventional web design. Anti-aesthetic approach. Raw, unpolished presentation.

**CONSTRAINTS:**
• Default browser styling - no polished CSS
• Raw Courier font - monospace
• Default blue links - web-safe colors
• High contrast - no subtle gradients
• Overlapping elements are intentional
• Maintain brutalist visual language
• Preserve raw, unpolished aesthetic
• No modern, polished design elements

**SOURCE MATERIAL:** Brutalist web design movement, anti-aesthetic design, raw HTML aesthetics, unconventional web design, digital brutalism.

**INTERPRETATION:** Emphasize raw, unpolished aesthetic and anti-design approach. Prioritize default browser styling and high contrast over polished, modern web design. If ambiguous, favor intentionally "ugly" or raw appearance over clean, professional interfaces.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u11/800/600',
  },
  {
    id: 'u12',
    title: 'Skeuomorphism',
    category: 'Design & UI',
    description: 'Leather, wood, stitched textures, realistic materials.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** iOS 6 App Icon in skeuomorphic style (standard app icon format, square, 1024x1024 or similar, designed for iOS 6 era).

**LAYOUT:** App icon with realistic material rendering. Central icon symbol or image. All elements arranged to showcase material textures. Composition emphasizes realistic, tactile appearance.

**COMPONENTS:**
• App icon symbol or image
• Leather texture with visible stitching
• Glossy glass overlay effect
• Realistic material rendering
• Wood, metal, or other material textures (if applicable)
• Depth and dimension through shadows
• Realistic lighting and reflections
• Rich, detailed material appearance

**STYLE:** Skeuomorphism design (iOS 6 era). Leather texture with visible stitching. Glossy glass overlay creating depth. Rich realistic material rendering. Wood, metal, fabric textures. Realistic lighting and shadows. Tactile, physical appearance. Pre-flat design aesthetic.

**CONSTRAINTS:**
• Realistic material textures - leather, wood, etc.
• Visible stitching on leather
• Glossy glass overlay effect
• Rich, detailed rendering
• Maintain skeuomorphic visual language
• Preserve realistic, tactile aesthetic
• No flat design - favor 3D, realistic appearance
• Material textures must be convincing

**SOURCE MATERIAL:** iOS 6 design era, skeuomorphic design tradition, realistic material rendering, pre-flat design aesthetics, tactile interface design.

**INTERPRETATION:** Emphasize realistic material rendering and tactile appearance. Prioritize leather textures, stitching, and glossy overlays over flat, minimal design. If ambiguous, favor rich, detailed skeuomorphic design over clean, flat interfaces.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u12/800/600',
  },
  {
    id: 'u13',
    title: 'Data Viz Dark Mode',
    category: 'Design & UI',
    description: 'Dark background, neon data lines, sleek modern.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Fintech Dashboard in dark mode data visualization style (standard dashboard format, full screen, landscape orientation).

**LAYOUT:** Dashboard with multiple data visualization panels. Charts, graphs, and metrics. All elements arranged for data clarity. Composition emphasizes information hierarchy and modern dark mode aesthetic.

**COMPONENTS:**
• Data visualization charts and graphs
• Neon green/purple graph lines
• Glowing nodes or data points
• Deep charcoal or black background
• Sleek sans-serif typography
• Information panels and metrics
• Grid or layout system
• Modern dashboard elements

**STYLE:** Dark Mode Data Visualization. Deep charcoal or black background. Neon green/purple graph lines creating contrast. Glowing nodes and data points. Sleek sans-serif typography. Modern, professional aesthetic. Fintech dashboard design. High contrast for readability.

**CONSTRAINTS:**
• Dark background - deep charcoal or black
• Neon colors for data lines (green, purple)
• Glowing effects on data points
• Sleek typography - modern sans-serif
• Maintain dark mode aesthetic
• Preserve data clarity and readability
• High contrast for visibility
• No bright, light backgrounds

**SOURCE MATERIAL:** Dark mode UI design, data visualization design, fintech dashboards, modern analytics interfaces, dark theme design principles.

**INTERPRETATION:** Emphasize dark mode aesthetic and data clarity. Prioritize neon data lines and glowing effects over muted, subtle visualizations. If ambiguous, favor dark backgrounds with neon accents and sleek modern design over light, colorful dashboards.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u13/800/600',
  },
  {
    id: 'u14',
    title: 'Risograph Print',
    category: 'Design & UI',
    description: 'Grainy texture, misaligned layers, limited color palette.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Zine cover in Risograph style (standard zine format, approximately 8.5" x 11" or similar, portrait orientation).

**LAYOUT:** Zine cover design with Risograph printing aesthetic. Text and graphics arranged for zine presentation. All elements integrated to showcase Risograph technique. Composition emphasizes print-making aesthetic.

**COMPONENTS:**
• Zine cover design (text, graphics, or illustration)
• Grainy dithering texture throughout
• Slight layer misalignment (registration errors)
• Fluorescent pink and blue ink colors
• Ink overlap creating color mixing
• Print-making aesthetic
• Limited color palette
• Textile or paper texture

**STYLE:** Risograph printing aesthetic. Grainy dithering texture from print process. Slight layer misalignment (intentional registration errors). Fluorescent pink and blue ink colors. Ink overlap creating color mixing. Print-making aesthetic. Limited color palette. Artisanal, DIY quality.

**CONSTRAINTS:**
• Grainy dithering texture must be visible
• Slight misalignment - intentional registration errors
• Limited color palette (typically 2-3 colors)
• Fluorescent colors - pink and blue
• Ink overlap creating color mixing
• Maintain Risograph visual language
• Preserve print-making aesthetic
• No smooth, digital rendering

**SOURCE MATERIAL:** Risograph printing technique, zine culture, DIY print-making, artisanal printing, limited color printing.

**INTERPRETATION:** Emphasize print-making aesthetic and artisanal quality. Prioritize grainy texture and slight misalignment over perfect, digital precision. If ambiguous, favor Risograph printing characteristics and limited color palette over smooth, full-color digital design.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u14/800/600',
  },
  {
    id: 'u15',
    title: 'Corporate Memphis',
    category: 'Design & UI',
    description: 'Flat, big limbs, pastel colors, tech startup style.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Landing page illustration in Corporate Memphis style (standard web illustration format, variable size, landscape orientation).

**LAYOUT:** Illustration with diverse characters or scenes. All elements arranged for landing page presentation. Composition emphasizes diversity, positivity, and modern tech aesthetic.

**COMPONENTS:**
• Diverse characters with exaggerated proportions
• Big limbs and simplified features
• Pastel color palette
• Flat vector illustration style
• Joyful, positive expressions
• Tech startup aesthetic
• Modern, friendly design
• Inclusive, diverse representation

**STYLE:** Corporate Memphis (Big Tech Art) style. Flat vector illustration. Exaggerated limb proportions (big limbs, simplified bodies). Pastel colors (soft pinks, blues, yellows, greens). Joyful diversity representation. Tech startup aesthetic. Friendly, approachable design. Modern corporate illustration trend.

**CONSTRAINTS:**
• Flat vector - no 3D effects
• Exaggerated limb proportions - big limbs
• Pastel colors - soft, muted palette
• Simplified features - not realistic
• Joyful, positive expressions
• Maintain Corporate Memphis visual language
• Preserve tech startup aesthetic
• Diverse, inclusive representation

**SOURCE MATERIAL:** Corporate Memphis illustration trend, big tech company art, modern startup design, flat vector illustration, inclusive design representation.

**INTERPRETATION:** Emphasize friendly, approachable design and diversity. Prioritize exaggerated proportions and pastel colors over realistic, detailed illustration. If ambiguous, favor joyful, positive Corporate Memphis style over serious, realistic character design.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/u15/800/600',
  },

  // --- PHOTOGRAPHY & REALISM ---
  {
    id: 'p1',
    title: 'Cinematic Wide Shot',
    category: 'Photography',
    description: 'Anamorphic lens, film grain, teal & orange, dramatic.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Movie still in cinematic format (anamorphic aspect ratio 2.39:1, standard film format, landscape orientation).

**LAYOUT:** Wide cinematic composition with dramatic framing. Subject positioned following rule of thirds. Background elements supporting narrative. All elements arranged for cinematic impact. Composition emphasizes dramatic storytelling and visual impact.

**COMPONENTS:**
• Main subject or scene
• Anamorphic lens flares (horizontal streaks)
• Background elements supporting narrative
• Dramatic lighting setup
• Atmospheric elements (if applicable)
• Film grain texture
• Teal and orange color grading
• Cinematic depth of field

**STYLE:** Cinematic movie still aesthetic. Anamorphic lens flares creating horizontal light streaks. Aspect ratio 2.39:1 (cinematic widescreen). Teal and orange color grading (classic Hollywood look). Dramatic lighting with high contrast. Film grain texture. Professional cinematography. Movie-quality presentation.

**CONSTRAINTS:**
• Anamorphic aspect ratio 2.39:1 - wide, cinematic format
• Anamorphic lens flares - horizontal streaks
• Teal and orange color grading - classic cinematic look
• Film grain must be visible
• Dramatic lighting - high contrast
• Maintain cinematic visual language
• Preserve movie-quality aesthetic
• No flat, documentary lighting

**SOURCE MATERIAL:** Hollywood cinematography, anamorphic lens techniques, film color grading, cinematic photography, movie still aesthetics.

**INTERPRETATION:** Emphasize cinematic quality and dramatic storytelling. Prioritize anamorphic format and teal/orange grading over natural, documentary photography. If ambiguous, favor dramatic, movie-quality presentation over realistic, ungraded photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p1/800/600',
  },
  {
    id: 'p2',
    title: 'Macro Insect',
    category: 'Photography',
    description: 'Extreme close up, compound eyes, shallow depth of field.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Macro photography of insect (extreme close-up format, 1:1 magnification or higher, portrait or square orientation).

**LAYOUT:** Extreme close-up composition with insect as central focus. Compound eyes and details in sharp focus. Background completely blurred. All elements arranged to showcase macro detail. Composition emphasizes extreme detail and texture.

**COMPONENTS:**
• Insect subject (extreme close-up)
• Compound eyes in sharp focus
• Extreme detail on textures (exoskeleton, wings, antennae)
• Shallow depth of field (bokeh background)
• Diffused, soft lighting
• Background completely blurred
• Macro photography detail
• Natural insect colors

**STYLE:** Nature macro photography. 1:1 magnification or higher (life-size or larger). Extreme detail on textures and surfaces. Shallow depth of field creating bokeh background. Diffused lighting for even illumination. Sharp focus on eyes and key details. Professional macro photography technique.

**CONSTRAINTS:**
• Extreme close-up - 1:1 magnification or higher
• Compound eyes must be in sharp focus
• Shallow depth of field - background completely blurred
• Extreme detail on textures
• Diffused lighting - no harsh shadows
• Maintain macro photography aesthetic
• Preserve natural insect colors
• Background must be soft bokeh

**SOURCE MATERIAL:** Macro photography techniques, nature photography, insect photography, extreme close-up photography, professional macro lenses.

**INTERPRETATION:** Emphasize extreme detail and macro technique. Prioritize sharp focus on compound eyes and textures over environmental context. If ambiguous, favor extreme close-up with shallow depth of field over wider shots with more background.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p2/800/600',
  },
  {
    id: 'p3',
    title: 'Studio Portrait',
    category: 'Photography',
    description: 'Rembrandt lighting, sharp focus, neutral background.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Headshot in studio portrait format (standard portrait format, approximately 8" x 10" proportions, portrait orientation).

**LAYOUT:** Portrait composition with subject as central focus. Rembrandt lighting creating triangle of light on cheek. Neutral background. All elements arranged for professional portrait presentation. Composition emphasizes subject and lighting technique.

**COMPONENTS:**
• Portrait subject (head and shoulders)
• Rembrandt lighting setup (triangle of light on cheek)
• Neutral grey backdrop
• Sharp focus on eyes
• Professional portrait framing
• Natural skin tones
• Background completely out of focus
• Studio lighting setup

**STYLE:** Studio portrait photography. Rembrandt lighting creating triangle of light on subject's cheek. 85mm lens (or equivalent) for flattering perspective. Sharp focus on eyes. Neutral grey backdrop. Professional headshot aesthetic. Clean, classic portrait presentation.

**CONSTRAINTS:**
• Rembrandt lighting - triangle of light on cheek
• Sharp focus on eyes - critical sharpness
• Neutral grey backdrop - no distracting backgrounds
• 85mm lens perspective (or equivalent)
• Maintain professional portrait aesthetic
• Preserve natural skin tones
• Background completely out of focus
• No harsh shadows except Rembrandt triangle

**SOURCE MATERIAL:** Studio portrait photography, Rembrandt lighting technique, professional headshots, portrait lighting setups, classic portrait photography.

**INTERPRETATION:** Emphasize professional portrait quality and Rembrandt lighting. Prioritize sharp focus on eyes and neutral background over environmental context. If ambiguous, favor classic studio portrait with Rembrandt lighting over natural, environmental portraits.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p3/800/600',
  },
  {
    id: 'p4',
    title: 'Drone Aerial',
    category: 'Photography',
    description: 'Top-down view, geometric patterns of landscape.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Aerial photography from drone (standard photography format, landscape orientation, high altitude view).

**LAYOUT:** Top-down 90-degree angle composition. Geometric patterns visible in landscape. All elements arranged to showcase aerial perspective. Composition emphasizes geometric patterns and abstract landscape view.

**COMPONENTS:**
• Landscape from top-down view
• Geometric patterns (fields, roads, structures)
• High altitude perspective
• Natural or man-made patterns
• Color variations creating patterns
• Minimal perspective distortion
• Aerial photography detail
• Abstract landscape composition

**STYLE:** Drone aerial photography. Top-down 90-degree angle (straight down). Geometric patterns in landscape (fields, roads, structures). High altitude view. Abstract, pattern-focused composition. Professional drone photography. Clean, geometric aesthetic.

**CONSTRAINTS:**
• Top-down 90-degree angle - straight down view
• Geometric patterns must be clear
• High altitude - not low-level aerial
• Minimal perspective - favor abstract patterns
• Maintain aerial photography aesthetic
• Preserve geometric pattern focus
• No dramatic perspective angles
• Abstract composition over narrative

**SOURCE MATERIAL:** Drone photography, aerial photography techniques, top-down photography, landscape patterns, abstract aerial views.

**INTERPRETATION:** Emphasize geometric patterns and abstract aerial view. Prioritize top-down 90-degree angle and pattern recognition over narrative or dramatic perspective. If ambiguous, favor high-altitude, pattern-focused aerial view over low-level, perspective-heavy aerial photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p4/800/600',
  },
  {
    id: 'p5',
    title: 'Double Exposure',
    category: 'Photography',
    description: 'Silhouette filled with another image, dreamy.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Artistic photograph in double exposure style (standard photography format, portrait or landscape orientation).

**LAYOUT:** Double exposure composition with silhouette and landscape. Silhouette of person as primary shape. Landscape or scene filling silhouette. White or light background. All elements integrated to create double exposure effect. Composition emphasizes dreamy, artistic presentation.

**COMPONENTS:**
• Silhouette of person (dark shape)
• Landscape or scene filling silhouette interior
• White or light background
• Dreamy, ethereal atmosphere
• Seamless integration of two images
• Artistic, creative composition
• Soft, blended edges
• Double exposure technique

**STYLE:** Double exposure photography technique. Silhouette of person filled with another image (forest landscape, cityscape, or scene). White background for contrast. Dreamy, ethereal atmosphere. Seamless blending of two exposures. Artistic, creative presentation. Film photography technique.

**CONSTRAINTS:**
• Silhouette must be clearly defined
• Interior of silhouette filled with second image
• White or light background for contrast
• Seamless blending - no harsh edges
• Maintain double exposure aesthetic
• Preserve dreamy, artistic atmosphere
• Two images must be clearly integrated
• No harsh, digital-looking composites

**SOURCE MATERIAL:** Double exposure photography, film photography techniques, artistic photography, creative photography, silhouette photography.

**INTERPRETATION:** Emphasize artistic double exposure technique and dreamy atmosphere. Prioritize seamless integration of two images and silhouette clarity over realistic, single-exposure photography. If ambiguous, favor creative, artistic double exposure over documentary, realistic photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p5/800/600',
  },
  {
    id: 'p6',
    title: 'Tilt-Shift (Miniature)',
    category: 'Photography',
    description: 'Blur top/bottom, looks like toys, high saturation.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Cityscape photo with tilt-shift effect (standard photography format, landscape orientation, wide view).

**LAYOUT:** Wide cityscape composition with selective focus plane. Central area in sharp focus. Top and bottom areas blurred. All elements arranged to create miniature world effect. Composition emphasizes selective focus and miniature aesthetic.

**COMPONENTS:**
• Cityscape or scene (wide view)
• Selective focus plane (horizontal band in focus)
• Blurred top and bottom areas
• High saturation colors
• Miniature world effect
• Sharp focus in center band
• Depth of field effect
• Tilt-shift photography technique

**STYLE:** Tilt-shift photography effect. Selective focus plane creating horizontal band of sharp focus. Blurred top and bottom areas. High saturation colors enhancing miniature effect. "Miniature world" appearance (looks like toys or models). Professional tilt-shift technique.

**CONSTRAINTS:**
• Selective focus plane - horizontal band in focus
• Top and bottom must be blurred
• High saturation - vibrant colors
• Miniature world effect - looks like toys/models
• Maintain tilt-shift visual language
• Preserve selective focus technique
• Sharp focus band must be clear
• No full-depth-of-field focus

**SOURCE MATERIAL:** Tilt-shift photography, selective focus techniques, miniature effect photography, creative photography techniques, depth of field manipulation.

**INTERPRETATION:** Emphasize tilt-shift miniature effect and selective focus. Prioritize horizontal focus band and high saturation over full-depth-of-field, natural photography. If ambiguous, favor miniature world appearance and selective blur over sharp, full-focus photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p6/800/600',
  },
  {
    id: 'p7',
    title: 'Product Editorial',
    category: 'Photography',
    description: 'Floating product, hard shadows, pastel background.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Advertising photography in modern product style (standard product photography format, square or landscape orientation, clean studio setting).

**LAYOUT:** Product as central focus. Floating or levitating appearance. Hard shadows creating depth. Pastel monochrome background. All elements arranged for modern product showcase. Composition emphasizes product and contemporary aesthetic.

**COMPONENTS:**
• Product (floating or levitating)
• Hard light creating defined shadows
• Long shadows extending from product
• Pastel monochrome background
• Clean, minimal composition
• Modern product photography aesthetic
• Professional studio lighting
• Contemporary advertising style

**STYLE:** Modern product photography. Hard light creating defined, long shadows. Pastel monochrome background (soft pink, blue, or neutral). Levitating or floating objects. Contemporary advertising aesthetic. Clean, minimal presentation. Professional product showcase.

**CONSTRAINTS:**
• Hard light - defined, sharp shadows
• Long shadows extending from product
• Pastel monochrome background - soft, single color
• Floating/levitating appearance
• Maintain modern product aesthetic
• Preserve clean, minimal composition
• No soft, diffused shadows
• Background must be pastel monochrome

**SOURCE MATERIAL:** Modern product photography, advertising photography, contemporary product showcase, studio product photography, minimalist product design.

**INTERPRETATION:** Emphasize modern product showcase and hard lighting. Prioritize floating appearance and pastel backgrounds over natural, environmental product photography. If ambiguous, favor contemporary, minimal product photography with hard shadows over soft, natural product shots.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p7/800/600',
  },
  {
    id: 'p8',
    title: 'Analog Film (Polaroid)',
    category: 'Photography',
    description: 'Light leaks, vintage border, soft focus, nostalgia.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Polaroid photo in analog film style (Polaroid format, approximately 3.1" x 3.1" square, white border frame).

**LAYOUT:** Square Polaroid composition with white border frame. Subject centered or following Polaroid conventions. All elements arranged for nostalgic, vintage aesthetic. Composition emphasizes analog film quality and instant photography feel.

**COMPONENTS:**
• Main subject or scene
• White frame border (Polaroid characteristic)
• Light leaks (colored light streaks)
• Dust and scratches (film artifacts)
• Soft focus (vintage lens quality)
• Vintage color cast (warm, faded tones)
• Analog film texture
• Nostalgic, vintage atmosphere

**STYLE:** Analog film Polaroid aesthetic. Light leaks creating colored light streaks. Dust and scratches from film handling. Soft focus (vintage lens quality). Vintage color cast (warm, faded tones). White frame border characteristic of Polaroid. Nostalgic, instant photography feel.

**CONSTRAINTS:**
• White frame border - Polaroid characteristic
• Light leaks - colored light streaks
• Dust and scratches - film artifacts
• Soft focus - not sharp, modern quality
• Vintage color cast - warm, faded
• Maintain Polaroid aesthetic
• Preserve nostalgic, analog feel
• No modern, digital sharpness

**SOURCE MATERIAL:** Polaroid instant photography, analog film photography, vintage photography, film photography techniques, nostalgic photography aesthetics.

**INTERPRETATION:** Emphasize analog film quality and nostalgic atmosphere. Prioritize Polaroid characteristics and vintage artifacts over sharp, modern digital photography. If ambiguous, favor warm, faded vintage aesthetic with light leaks and soft focus over crisp, clean digital photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p8/800/600',
  },
  {
    id: 'p9',
    title: 'Underwater',
    category: 'Photography',
    description: 'Refracted light, caustic patterns, bubbles, blue.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Underwater photography (standard photography format, portrait or landscape orientation, underwater environment).

**LAYOUT:** Underwater scene composition. Subject or scene in water. Refracted sunlight creating caustic patterns. All elements arranged to showcase underwater environment. Composition emphasizes aquatic atmosphere and light effects.

**COMPONENTS:**
• Underwater subject or scene
• Refracted sunlight (caustic patterns on surfaces)
• Floating particles or bubbles
• Deep blue gradient (water depth)
• Aquatic environment
• Light rays through water
• Underwater photography technique
• Subaquatic atmosphere

**STYLE:** Subaquatic underwater photography. Refracted sunlight creating caustic patterns (wavy light patterns on surfaces). Floating particles and bubbles. Deep blue gradient showing water depth. Professional underwater photography. Aquatic, immersive atmosphere.

**CONSTRAINTS:**
• Refracted light - caustic patterns must be visible
• Floating particles/bubbles - underwater atmosphere
• Deep blue gradient - water depth
• Maintain underwater photography aesthetic
• Preserve aquatic atmosphere
• Caustic patterns are crucial
• No surface-level, shallow water appearance
• Blue color palette dominant

**SOURCE MATERIAL:** Underwater photography, subaquatic photography techniques, caustic light patterns, aquatic photography, professional underwater photography.

**INTERPRETATION:** Emphasize underwater atmosphere and caustic light effects. Prioritize refracted sunlight patterns and deep blue gradient over surface-level, shallow water photography. If ambiguous, favor deep underwater environment with caustic patterns over shallow, clear water shots.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p9/800/600',
  },
  {
    id: 'p10',
    title: 'Thermal Imaging',
    category: 'Photography',
    description: 'Heat map colors, predator vision, high contrast.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Surveillance footage in thermal imaging style (standard video/frame format, landscape orientation, thermal camera aesthetic).

**LAYOUT:** Thermal imaging composition showing heat signatures. Subject or scene in thermal view. All elements arranged to showcase thermal imaging technique. Composition emphasizes heat detection and surveillance aesthetic.

**COMPONENTS:**
• Subject or scene in thermal view
• Heat map color palette (blue cold, red/white hot)
• Thermal signatures and heat patterns
• High contrast for visibility
• Grainy texture (thermal camera quality)
• Surveillance aesthetic
• Temperature visualization
• Thermal imaging technique

**STYLE:** Thermal camera imaging. Heat map color palette (blue for cold, yellow/orange/red/white for hot). Grainy texture from thermal sensor. High contrast for visibility. Surveillance footage aesthetic. Predator vision appearance. Professional thermal imaging.

**CONSTRAINTS:**
• Heat map colors - blue cold, red/white hot
• Grainy texture - thermal sensor quality
• High contrast - clear heat signatures
• Maintain thermal imaging visual language
• Preserve surveillance aesthetic
• No natural colors - only heat map
• Temperature visualization is key
• No smooth, digital rendering

**SOURCE MATERIAL:** Thermal imaging technology, surveillance cameras, heat detection, thermal photography, infrared imaging techniques.

**INTERPRETATION:** Emphasize thermal imaging technique and heat visualization. Prioritize heat map colors and grainy texture over natural, visible-light photography. If ambiguous, favor thermal camera aesthetic with heat signatures over realistic, color photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p10/800/600',
  },
  {
    id: 'p11',
    title: 'Food Photography',
    category: 'Photography',
    description: 'Mouth-watering, steam, selective focus, high vibrance.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Restaurant menu shot in commercial food photography style (standard food photography format, landscape orientation, professional food styling).

**LAYOUT:** Food dish as central focus. Steam rising from hot food. Selective focus on main dish. Background blurred. All elements arranged for appetizing presentation. Composition emphasizes food appeal and commercial quality.

**COMPONENTS:**
• Food dish (main subject)
• Steam rising from hot food
• Glistening oil or sauce
• Fresh ingredients visible
• Bokeh background (blurred)
• Warm, appetizing lighting
• High vibrance colors
• Professional food styling

**STYLE:** Commercial food photography. Steam rising from hot dishes. Glistening oil and sauces. Fresh ingredients prominently displayed. Bokeh background for focus. Warm lighting enhancing food appeal. High vibrance colors. Mouth-watering presentation. Professional restaurant menu quality.

**CONSTRAINTS:**
• Steam must be visible on hot food
• Glistening oil/sauce - appetizing appearance
• Fresh ingredients - not wilted or old
• Bokeh background - blurred
• Warm lighting - appetizing
• High vibrance - colors pop
• Maintain commercial food photography aesthetic
• Preserve mouth-watering appeal

**SOURCE MATERIAL:** Commercial food photography, restaurant menu photography, food styling, professional food photography, appetizing food presentation.

**INTERPRETATION:** Emphasize food appeal and commercial quality. Prioritize steam, glistening surfaces, and high vibrance over natural, documentary food photography. If ambiguous, favor appetizing, styled food presentation with warm lighting over realistic, unappetizing food shots.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p11/800/600',
  },
  {
    id: 'p12',
    title: 'Long Exposure Light Trails',
    category: 'Photography',
    description: 'City night, car lights as streaks, smooth water.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Night city photo with long exposure technique (standard photography format, landscape orientation, night photography).

**LAYOUT:** Night cityscape composition. Car light trails creating streaks. Water smooth from long exposure. All elements arranged for long exposure effect. Composition emphasizes motion and time passage.

**COMPONENTS:**
• Night cityscape
• Light trails from moving cars (streaks)
• Smooth, silky water (long exposure effect)
• Starburst streetlights
• Tripod stability (sharp static elements)
• Motion blur from movement
• Long exposure technique
• Night photography atmosphere

**STYLE:** Long exposure night photography. Light trails from cars creating colorful streaks. Smooth, silky water from long exposure. Starburst streetlights (aperture effect). Tripod stability keeping static elements sharp. Motion blur showing time passage. Professional night photography technique.

**CONSTRAINTS:**
• Light trails - car lights as streaks
• Smooth water - long exposure effect
• Starburst streetlights - aperture effect
• Static elements must be sharp (tripod)
• Motion blur on moving elements
• Maintain long exposure aesthetic
• Preserve night photography atmosphere
• No frozen motion - favor motion blur

**SOURCE MATERIAL:** Long exposure photography, night photography techniques, light trail photography, time-lapse effects, professional night photography.

**INTERPRETATION:** Emphasize long exposure effects and motion blur. Prioritize light trails and smooth water over frozen, high-speed photography. If ambiguous, favor long exposure showing time passage and motion over sharp, frozen night photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p12/800/600',
  },
  {
    id: 'p13',
    title: 'Infrared Photography',
    category: 'Photography',
    description: 'Surreal colors, white foliage, dark sky (Aerochrome).',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Landscape photo in Kodak Aerochrome infrared style (standard photography format, landscape orientation, infrared film aesthetic).

**LAYOUT:** Landscape composition with infrared color shift. Foliage and sky showing infrared characteristics. All elements arranged to showcase infrared film effect. Composition emphasizes surreal, dreamlike atmosphere.

**COMPONENTS:**
• Landscape scene
• Foliage turned hot pink/red (infrared effect)
• Sky turned deep dark blue
• Surreal color palette
• Dreamlike atmosphere
• Infrared film aesthetic
• Natural elements in infrared
• Aerochrome film characteristics

**STYLE:** Kodak Aerochrome infrared film aesthetic. Foliage turns hot pink/red (chlorophyll reflects infrared). Sky turns deep dark blue. Surreal, dreamlike color palette. Infrared photography technique. Unique, artistic color shift. Professional infrared film photography.

**CONSTRAINTS:**
• Foliage must be hot pink/red - infrared effect
• Sky must be deep dark blue
• Surreal colors - not natural
• Maintain Aerochrome aesthetic
• Preserve dreamlike atmosphere
• No natural green foliage
• Infrared color shift is crucial
• Unique, artistic color palette

**SOURCE MATERIAL:** Kodak Aerochrome infrared film, infrared photography techniques, surreal photography, artistic color photography, infrared film aesthetics.

**INTERPRETATION:** Emphasize infrared color shift and surreal atmosphere. Prioritize Aerochrome color characteristics (pink foliage, dark blue sky) over natural, visible-light photography. If ambiguous, favor surreal, dreamlike infrared colors over realistic, natural landscape colors.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p13/800/600',
  },
  {
    id: 'p14',
    title: 'Sports Action (Freeze Frame)',
    category: 'Photography',
    description: 'High shutter speed, frozen motion, intensity.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Sports photography with high shutter speed (standard photography format, landscape or portrait orientation, action photography).

**LAYOUT:** Sports action composition with frozen motion. Athlete in dynamic pose. Background blurred from motion. All elements arranged to capture peak action moment. Composition emphasizes intensity and athletic performance.

**COMPONENTS:**
• Athlete in action pose
• Frozen motion (water droplets, sweat, movement)
• Tense muscles and athletic form
• Blurred stadium or background
• High shutter speed technique
• Peak action moment
• Sports photography aesthetic
• Intensity and energy

**STYLE:** High shutter speed sports photography. Frozen motion capturing peak action (water droplets, sweat frozen in air). Tense muscles showing athletic intensity. Blurred stadium background from shallow depth of field. Professional sports photography. Action-focused presentation.

**CONSTRAINTS:**
• Frozen motion - no motion blur on subject
• High shutter speed - sharp, crisp action
• Tense muscles - athletic intensity
• Blurred background - shallow depth of field
• Peak action moment - not static
• Maintain sports photography aesthetic
• Preserve intensity and energy
• No motion blur on main subject

**SOURCE MATERIAL:** Sports photography, action photography techniques, high-speed photography, athletic photography, professional sports photography.

**INTERPRETATION:** Emphasize frozen action and athletic intensity. Prioritize high shutter speed and sharp, crisp motion over motion blur. If ambiguous, favor frozen, peak-action moments with sharp detail over blurred, motion-heavy sports photography.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p14/800/600',
  },
  {
    id: 'p15',
    title: 'Architectural Brutalism',
    category: 'Photography',
    description: 'Raw concrete, massive forms, monochromatic, imposing.',
    promptSnippet: `[PROMPT START]
**WORK SURFACE:** Architectural photography in brutalist style (standard photography format, portrait or landscape orientation, architectural photography).

**LAYOUT:** Brutalist architecture composition. Massive concrete forms as subject. All elements arranged to emphasize scale and raw material. Composition emphasizes imposing presence and geometric forms.

**COMPONENTS:**
• Brutalist architecture (concrete structures)
• Raw concrete textures
• Massive geometric forms
• Monochromatic grey palette
• Imposing scale and presence
• Geometric composition
• Architectural photography technique
• Raw, unadorned aesthetic

**STYLE:** Brutalist architectural photography. Raw concrete textures with visible aggregate. Massive geometric forms showing scale. Monochromatic grey color palette. Imposing, powerful presence. Geometric composition. Professional architectural photography. Raw, unadorned aesthetic.

**CONSTRAINTS:**
• Raw concrete - visible texture and aggregate
• Massive forms - emphasize scale
• Monochromatic grey - no colorful elements
• Imposing presence - powerful, strong
• Maintain brutalist aesthetic
• Preserve raw, unadorned quality
• No decorative elements
• Geometric forms are key

**SOURCE MATERIAL:** Brutalist architecture, architectural photography, concrete architecture, modernist architecture, raw material aesthetics.

**INTERPRETATION:** Emphasize raw concrete and massive scale. Prioritize monochromatic grey and imposing presence over colorful, decorative architecture. If ambiguous, favor raw, geometric brutalist forms over ornate, decorative architectural elements.
[PROMPT END]`,
    imageUrl: 'https://picsum.photos/seed/p15/800/600',
  },
];