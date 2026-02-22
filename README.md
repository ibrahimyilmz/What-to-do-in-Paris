# What to Do in Paris?
**A Smart Cultural Event Discovery & Transit Platform**

## Project Overview
This application is designed to solve a common problem for students and residents in the Greater Paris area: **discovering and reaching cultural events efficiently.** This project integrates real-time transit data and geographical calculations to provide a localized and practical experience for the user.

## Key Features
- **Smart Localization**: Calculates the direct distance from the user's home to the event using the **Haversine Formula**.
- **Transit Integration**: Fetches real-time travel duration via the **Île-de-France Mobilités (PRIM) API**.
- **Budget-Friendly Discovery**: Includes a "Gratuit" (Free) filter to help students find accessible events.
- **Performance Optimized**: Implements a backend caching layer using **Diskcache** to minimize external API calls and reduce latency.
- **Infinite Discovery**: Supports server-side pagination (offset-based) for seamless event browsing.

## Technical Stack
- **Backend**: FastAPI (Python 3.11), Uvicorn, Pydantic, Httpx.
- **Frontend**: React 19 (TypeScript), Vite, Material UI (MUI).
- **DevOps**: Docker

## Architecture & Engineering Choices
- **Repository Pattern**: Abstracted data access layers for both the Paris Open Data and PRIM APIs.
- **Service Layer**: Business logic—such as distance calculation and transit duration orchestration—is isolated from the API controllers.
- **Geospatial Logic**: Implementation of the Haversine formula to calculate the Great-circle distance between two points.

### Getting Started

## Prerequisites
- **Docker & Docker Compose** installed on your machine.
- A **PRIM (Île-de-France Mobilités)** API Key. You can obtain one for free by creating an account at the [PRIM Portal](https://prim.iledefrance-mobilites.fr/).

## Installation & Setup

# Environment Configuration:
The backend requires an API token to fetch transit data. Create a .env file in the backend/ directory:
Inside backend/.env
TRAVEL_TIME_TOKEN=your_prim_api_key_here

# Launch with Docker Compose:
docker-compose up --build

# Access the Application:

Frontend: http://localhost:5173
Backend API : http://localhost:8000/docs

