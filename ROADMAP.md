# Kaiser Quest roadmap

## Phase 0 — Foundation (Task 001)

Modernize the runnable Node stack, document the existing game, preserve the protocol, define the art pipeline, and keep reference artwork out of production assets.

## Phase 1 — Authoritative core (Task 002)

Add a server simulation tick with input rate limits, movement path and range checks, entity lifecycle ownership, and protocol validation. Move attacks, hit timing, damage, death, and mob attacks into this tick. Add automated protocol and combat tests.

## Phase 2 — Characters and persistence

Implement accounts or guest identities, persistent character records, classes, base and derived statistics, XP and levels, equipment slots, inventory stacks, and migrations. Keep all mutations server-side.

## Phase 3 — Content and world

Create a data schema for mobs, drops, items, NPC dialogue, quests, recipes, gathering nodes, regions, dungeons, and portal connections. Add region loading and instance lifecycles.

## Phase 4 — Production art vertical slice

Produce one forest region with verified tiles, one player class, NPCs, basic mobs, a boss, combat effects, and UI. Integrate only assets that pass `ASSET_SPEC.md` validation.

## Phase 5 — Multiplayer systems

Add parties, chat moderation, guilds, trading, server-side transaction logs, abuse controls, telemetry, and operational tooling.

## Phase 6 — Scale and release

Load testing, shard/instance routing, monitoring, backups, accessibility, browser support, security review, licensing audit, and staged deployment.
