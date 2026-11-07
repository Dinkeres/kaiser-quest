# Kaiser Quest development

## Requirements

Use Node.js 20 or 22 LTS. Task 001 was verified with Node.js 24.19.0 and npm 11.17.0; the package engine range intentionally supports the current LTS line through Node 24.

## Install and run

```powershell
npm install
npm start
```

Open `http://localhost:8000/`. The same process provides the static browser client, the WebSocket endpoint, and `http://localhost:8000/status`.

Use `npm run check` for server syntax checks, `npm run verify:combat` for combat gating checks, and `npm run verify:network` while the server is running. Build the legacy optimized client with `npm run build:client` in a Bash-capable environment; it produces ignored `client-build/`. Edit `client/config/config_build.json` to set a deployed host and port for a production build.

## Local configuration

`server/config.json` contains the default port, world count, player cap, map path, logging, and disabled metrics. Create `server/config_local.json` for local overrides; it is ignored by git. Metrics are not currently supported by the modern dependency set, so leave `metrics_enabled` false.

## Verification checklist

After a network change, run `npm run check`, start the server, request `/status`, load `/`, and connect a WebSocket client through the HELLO/WELCOME exchange. A browser rendering check still requires a real browser; report it as unperformed unless it was observed.
