# MoneySmart – Your AI Finance Buddy!

This project is Vercel-ready and includes:
- React + Vite + Tailwind frontend
- Firebase auth + Firestore placeholders
- Serverless API `api/openai-proxy.js` (Vercel) which proxies to OpenAI and enforces finance-only responses

## Quick local dev
1. Copy `.env.example` to `.env` and fill VITE_FIREBASE_* values.
2. `npm install`
3. `npm run dev`

## Deploy to Vercel
1. Push this repo to GitHub
2. Import project in Vercel
3. Set Environment Variables in Vercel (OPENAI_API_KEY plus VITE_FIREBASE_* for preview if needed)
4. Build command: `npm run build` (Vite)
5. Output directory: `dist`

## Notes
- The serverless function uses `OPENAI_API_KEY` from Vercel environment variables.
- Admin page is protected via a simple admin-check (you can extend using custom claims).
