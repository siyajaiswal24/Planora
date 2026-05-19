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

## Deployment

To deploy the app, publish the backend to a Node-compatible host and the frontend to a static site host, then update the frontend API URL in `frontend/src/components/PlannerForm.jsx`.

## License

This project is provided as-is.
