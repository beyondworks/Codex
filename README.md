YouTube Shopping Search (Static Web App)

This simple static page searches YouTube for videos and filters the results to those that appear to be shopping-related. Because YouTube’s public API does not expose an official "has shopping tag" filter, this app approximates shopping content by checking video tags and (optionally) title/description against a configurable keyword list.

Files
- index.html — UI, inputs, and containers
- app.js — YouTube API calls, filtering, rendering, pagination
  - Supports a "Shorts only" mode: uses search `videoDuration=short` and additionally filters videos to <=70s or with #shorts/쇼츠 hints.
- styles.css — Responsive card layout and theme
 - README.md — Setup and notes

Server (optional, for Python + Node)
- server/src/server.js — Express service layer
- server/src/youtube.js — YouTube API wrapper (Node 18+ global fetch)
- server/src/analyze.js — Bridges to Python analyzer, with JS fallback
- server/analyzer/analyze.py — Python analysis/scoring pipeline

Run the server
1) cd server
2) npm i (Node 18+)
3) export YOUTUBE_API_KEY=YOUR_KEY
4) npm start (listens on http://localhost:5050)

Frontend with server
- Leave the API Key field empty. The frontend will call POST http://localhost:5050/api/search with your query and options.
- If you fill the API Key, the frontend performs direct browser calls instead (no server).

Setup
1) Obtain a YouTube Data API v3 key from Google Cloud Console.
2) Open index.html in a browser.
3) Paste your API key, enter a query, and click "Search Shopping Videos".

Notes
- The keyword list is editable via the disclosure panel in the UI.
- Enable "Safe search" to reduce adult/sensitive results.
- Click "Load more" to paginate through results.

Security
- Using an API key directly in the browser exposes the key to users. Restrict your key to YouTube Data API v3 and set HTTP referrer restrictions. For stricter security, proxy requests through a lightweight server that injects the key server-side.
# Codex
