# Planora

Planora is an AI-powered travel planning application with a React/Vite frontend and an Express backend. It generates detailed itineraries, hotel recommendations, restaurant suggestions, and destination guides using OpenRouter AI. Users can sign up, save trips, and explore generated route plans on a map.

## Features

- AI-driven itinerary creation for custom trips
- Destination selection, dates, budget, travel type, and interests
- User authentication with Firebase
- Save and delete trip plans in Firestore
- Interactive map display with destination coordinates
- Download itinerary PDFs
- Mobile-responsive UI built with Tailwind CSS

## Project Structure

- `/frontend` — React frontend powered by Vite
  - `src/App.jsx` — main app routes and page setup
  - `src/pages` — Home, Planner, TripResult, Login, Register, SavedTrips
  - `src/components` — UI components, planner form, hero sections
  - `src/firebase.js` — Firebase initialization

- `/backend` — Express API server
  - `server.js` — OpenRouter AI integration and itinerary generation endpoint
  - `package.json` — backend dependencies and development script

## Setup

### Backend

1. Create a local `.env` file in `/backend` with:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

2. Install and run:

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5001`.

### Frontend

1. Install dependencies and run:

```bash
cd frontend
npm install
npm run dev
```

2. Open the local Vite URL printed in the terminal (typically `http://localhost:5173`).

## Notes

- `backend/.env` is intentionally ignored and should not be committed.
- Firebase config is already present in `frontend/src/firebase.js`.
- Make sure the backend server is running before generating a trip from the frontend.

## Environment Variables

Copy the `.env.example` files in each folder to `.env` and fill in your actual keys (local development only).

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5001
VITE_PEXELS_API_KEY=your_pexels_key
VITE_GEOAPIFY_API_KEY=your_geoapify_key
```

**Backend** (`backend/.env`):
```
OPENROUTER_API_KEY=your_openrouter_key
FRONTEND_URL=http://localhost:5173
PORT=5001
NODE_ENV=development
```

⚠️ **Never commit `.env` files to Git.** Use `.env.example` as a template and only store secrets in deployment platform dashboards.

## Deployment

### Frontend (Vercel)

1. Push code to GitHub.
2. Go to [Vercel](https://vercel.com) → New Project → Import your GitHub repo.
3. Set Project Root to `frontend`.
4. Add Environment Variables:
   - `VITE_API_URL` = https://your-backend-url (set after backend deploy)
   - `VITE_PEXELS_API_KEY` = your_pexels_key
   - `VITE_GEOAPIFY_API_KEY` = your_geoapify_key
5. Deploy. Vercel generates a URL for your app.

### Backend (Render)

1. Go to [Render](https://render.com) → New → Web Service.
2. Connect GitHub and select the `Planora` repo, branch `main`.
3. Set Root Directory to `backend`.
4. Build Command: `npm install`  
   Start Command: `npm start`
5. Add Environment Variables:
   - `OPENROUTER_API_KEY` = your_openrouter_key
   - `FRONTEND_URL` = https://your-vercel-url
   - `NODE_ENV` = production
6. Deploy. Copy the service URL and set `VITE_API_URL` in Vercel to this URL.

### Verify Deployment

- Test frontend: open Vercel URL → try generating a trip.
- Test backend directly:
  ```bash
  curl -X POST https://your-backend-url/generate-trip \
    -H "Content-Type: application/json" \
    -d '{"from":"Delhi","destination":"Goa","startDate":"10 May 2026","endDate":"12 May 2026","budget":20000,"travelType":"Solo","interests":["Beaches"]}'
  ```
- Check Render logs if requests fail.

## License

This project is provided as-is.
