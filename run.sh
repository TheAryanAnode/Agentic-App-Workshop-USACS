#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

bypass=false
for arg in "$@"; do
  case "$arg" in
    --bypass|-y)
      bypass=true
      ;;
    -h|--help)
      echo "Usage: ./run.sh [--bypass]"
      echo "  --bypass, -y   Start the app even without an API key"
      exit 0
      ;;
  esac
done

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install Node 20 or newer, then run ./run.sh again."
  exit 1
fi

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "Created .env.local from .env.example."
  if [ "$bypass" = false ]; then
    echo "Add your Google AI Studio key to .env.local, then run ./run.sh again."
    echo "Or start without a key: ./run.sh --bypass"
    echo "Get a key at https://aistudio.google.com/apikey"
    exit 1
  fi
fi

has_key=false
while IFS= read -r line || [ -n "$line" ]; do
  case "$line" in
    GOOGLE_API_KEY=your_*|GEMINI_API_KEY=your_*|GROQ_API_KEY=your_*)
      ;;
    GOOGLE_API_KEY=?*|GEMINI_API_KEY=?*|GROQ_API_KEY=?*)
      has_key=true
      ;;
  esac
done < .env.local

if [ "$has_key" = false ] && [ "$bypass" = false ]; then
  echo "Add a real GOOGLE_API_KEY to .env.local (or GROQ_API_KEY as a fallback)."
  echo "Or start without a key: ./run.sh --bypass"
  echo "Get a key at https://aistudio.google.com/apikey"
  exit 1
fi

if [ "$has_key" = false ]; then
  echo "Starting without an API key. Chat will fail until you add GOOGLE_API_KEY to .env.local."
fi

if [ ! -d node_modules ]; then
  npm install
fi

echo "Starting the Rutgers Campus Assistant at http://localhost:3000"
npm run dev
