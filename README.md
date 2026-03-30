# What to Do in Paris?

A smart cultural event discovery and transit platform for students and residents in the Greater Paris area.

![System architecture](docs/architecture-overview.png)

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Quick Start with Docker](#quick-start-with-docker)
6. [Run Locally (Without Docker)](#run-locally-without-docker)
7. [API Reference](#api-reference)
8. [Project Structure](#project-structure)
9. [Troubleshooting](#troubleshooting)
10. [Roadmap](#roadmap)

## Overview

This project helps users discover cultural events in Paris and quickly estimate how easy they are to reach.
It combines:

- Paris Open Data event discovery.
- Geospatial distance calculation (Haversine).
- Real-time transit duration from the PRIM API.

## Features

- Smart localization: computes direct distance from a predefined home location to each event.
- Transit integration: enriches events with public transport duration using Ile-de-France Mobilites PRIM.
- Budget-friendly filtering: supports free-only events.
- Server-side pagination: offset-based event browsing for scalable loading.
- API caching: uses Diskcache (10-minute TTL) to reduce external API calls and latency.

## Tech Stack

- Backend: FastAPI, Python 3.11, Pydantic, HTTPX, Diskcache, Uvicorn.
- Frontend: React 19, TypeScript, Vite, Material UI.
- Containerization: Docker and Docker Compose.

## Architecture

The backend follows a layered design:

- Repository layer: handles external API access (Paris Open Data and PRIM).
- Service layer: handles distance/travel-time enrichment and caching.
- API layer: exposes HTTP endpoints consumed by the frontend.

Data flow:

1. Frontend calls `/api/events`.
2. Backend checks cache by query/filter/page key.
3. On cache miss, backend fetches events from Paris Open Data.
4. Backend computes distance and fetches travel duration from PRIM.
5. Response is cached and returned to frontend.

## Quick Start with Docker

### Prerequisites

- Docker Desktop (or Docker Engine + Compose plugin).
- A PRIM API key from https://prim.iledefrance-mobilites.fr/.

### 1) Configure environment variables

Create `backend/.env` with:

```env
TRAVEL_TIME_TOKEN=your_prim_api_key_here
```

### 2) Build and run

From the project root:

```bash
docker compose up --build
```

### 3) Open the app

- Frontend: http://localhost:5173
- Backend OpenAPI docs: http://localhost:8000/docs
- Backend health/root endpoint: http://localhost:8000/

## Run Locally (Without Docker)

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev -- --host
```

Frontend expects backend at `http://localhost:8000/api`.

## API Reference

### GET `/api/events`

Returns a list of events enriched with distance and travel time.

Query parameters:

- `limit` (int, default `20`): number of events to fetch.
- `q` (string, optional): search text applied to event title.
- `is_free` (bool, default `false`): return only free events when `true`.
- `offset` (int, default `0`): pagination offset.

Example request:

```http
GET /api/events?limit=20&q=jazz&is_free=true&offset=0
```

Example response item:

```json
{
	"id": "event-id",
	"title": "Jazz Night",
	"description": "Live jazz performance",
	"date_start": "2026-04-01T19:00:00+00:00",
	"date_end": "2026-04-01T22:00:00+00:00",
	"url": "https://example.com/event",
	"image_url": "https://example.com/image.jpg",
	"address_name": "Paris Venue",
	"lat": 48.8566,
	"lon": 2.3522,
	"distance": 7.4,
	"travel_time": 29,
	"price_type": "gratuit"
}
```

Notes:

- `distance` is in kilometers.
- `travel_time` is in minutes and may be `null` if transit data is unavailable.

## Project Structure

```text
CaseStudy/
	backend/
		main.py
		services.py
		repository.py
		schemas.py
		utils.py
		event_cache/
	frontend/
		src/
			components/
			services/
			views/
	docs/
		architecture-overview.svg
	docker-compose.yml
```

## Troubleshooting

- Frontend cannot reach backend:
	- Verify backend is running on port 8000.
	- Verify frontend uses `http://localhost:8000/api`.

- CORS errors in browser:
	- Backend currently allows origin `http://localhost:5173`.
	- If frontend runs on another host/port, update CORS in `backend/main.py`.

- Missing travel time values:
	- Check `TRAVEL_TIME_TOKEN` in `backend/.env`.
	- Ensure PRIM key is valid and has access.

- Port already in use:
	- Free ports 5173/8000 or remap ports in `docker-compose.yml`.


