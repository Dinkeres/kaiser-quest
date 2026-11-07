# BrowserQuest Reborn — Forest Art Reference v1

This package contains a generated **concept/reference atlas**, NOT production-ready spritesheets. Do not directly import the atlas as a frame-perfect animation sheet. The artwork includes labels, backgrounds, inconsistent cell sizes, and nontransparent pixels.

## Intended technical specification
- Camera: top-down three-quarter view; crisp nearest-neighbor rendering.
- World grid: 32x32 pixels per tile.
- Player/NPC animation canvas: 32x48 pixels per frame.
- Standard monster frame canvas: 32x32 or 64x64 pixels; bosses 96x96 or larger as needed.
- Four directions: down, left, right, up.
- Actions: idle, walk, attack, hurt, death (actual frame counts to be determined by completed art).
- Output: transparent RGBA PNG, no labels, no backgrounds, exact cell boundaries.
- Each atlas must have JSON metadata: frame dimensions, frame rects, animation sequences, direction, frame durations, anchor and collision bounds.
- Use nearest-neighbor scaling and verify every frame in an in-game preview.

## Reference coverage
Characters (warrior, rogue, mage, archer), monsters (slime, wolf, goblin, skeleton, spider, boar, treant, forest golem), NPCs, weapons, armor, consumables, forest terrain, buildings, props, combat effects, and UI.

## Next production steps
1. Produce one hero sprite with consistent idle/walk/attack in four directions, transparent background.
2. Export exact grid frames and metadata; visually verify animation.
3. Repeat for enemies and NPCs.
4. Produce seamless terrain tiles with tested edge transitions.
5. Build collision masks and animation previews; only then integrate into the game.
