# Kaiser Quest asset specification

The current forest pack at `assets/BQReborn_Forest_Art_v1/` contains `reference/forest_concept_atlas.png` (a 3,017,150-byte concept atlas) and a manifest marked `production_ready: false`. Its own README says it includes labels, backgrounds, inconsistent cell sizes, and nontransparent pixels. It must not be imported as a production sprite sheet.

## Production exports

- Export 32-bit RGBA PNG files with true transparent pixels outside artwork. Remove labels, solid backgrounds, color matte, and padding that crosses a cell boundary.
- Terrain uses 32×32 pixel tiles. Tilesets use a regular row-major grid and an image width divisible by 32.
- Player and NPC frames use 32×48 pixel cells. Standard monsters use 32×32 or 64×64; bosses use 96×96 or another declared multiple of 32.
- Sheet rows are ordered down, left, right, up. For each direction, action order is idle, walk, attack, hurt, death. A sheet may omit an action only when metadata says so.
- Use a consistent bottom-center draw anchor. A 32×48 character's default anchor is `(16, 44)` and a starting solid collision footprint is `(x: 6, y: 34, w: 20, h: 10)`. Tune from visual testing, never from opaque image bounds.
- Keep gameplay collision masks and interaction bounds in metadata; terrain collision remains map data.

## Metadata

Each production asset has a JSON file beside its PNG. Existing BrowserQuest metadata supports `{id,width,height,animations:{name:{length,row}}}`. Kaiser Quest metadata extends this without breaking the old reader:

```json
{
  "id": "forest_warrior",
  "image": "forest_warrior.png",
  "frame": { "width": 32, "height": 48 },
  "anchor": [16, 44],
  "collision": [6, 34, 20, 10],
  "animations": {
    "walk_down": { "frames": [0, 1, 2, 3], "duration_ms": 120 }
  }
}
```

For a tileset, record tile size, tile IDs, animation frame IDs and timing, terrain tags, collision, height/occlusion, and transitions. Use named content IDs, never image coordinates in gameplay code.

## Rendering and validation

Canvas rendering currently loads each sprite and tileset once through browser image caching. Future loaders should cache textures by URL and metadata by ID, preload region manifests, use `imageSmoothingEnabled = false`, and avoid texture mutation. Animation timing is metadata driven in milliseconds; use 120 ms as the initial walk cadence and verify each action in an in-game preview.

Before integration, verify dimensions, alpha, grid alignment, every directional animation, anchors, collisions, tile seams, occlusion, browser memory, and license/attribution. Keep source files and the unverified reference atlas in `assets/`.
