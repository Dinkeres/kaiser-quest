# Kaiser Quest development guide

Kaiser Quest retains Mozilla BrowserQuest code under MPL 2.0 and content under CC-BY-SA 3.0. Keep applicable notices and attribution when modifying or replacing material.

- Use Node.js 20 or 22 LTS. Do not add dependencies without a concrete runtime need.
- Start with `npm start`; it serves the legacy client and WebSocket protocol on port 8000.
- Run `npm run check` after server edits. Test `/status`, the client root, and a WebSocket HELLO handshake for networking changes.
- Treat every client message as untrusted. Movement, range, ownership, combat timing, damage, inventory mutations, experience, and persistence must be validated on the server.
- Preserve the current JSON protocol unless client and server are migrated together with compatibility coverage.
- Add game content as data with stable identifiers. Keep simulation rules separate from transport, map loading, and rendering.
- Keep unverified art under `assets/`; do not replace client assets until it passes the production checklist in `ASSET_SPEC.md`.
- Do not store credentials, player records, generated dependency folders, or local configuration in git.

## Near-term code boundaries

Add server features behind modules for `combat`, `characters`, `world`, `social`, and `persistence`. WorldServer should orchestrate those modules, while message parsing remains a thin adapter. Client prediction may animate actions, but server state is authoritative.
