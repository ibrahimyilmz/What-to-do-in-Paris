from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from schemas import ParisEvent
from services import fetch_paris_events

app = FastAPI(title="Paris Events API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "API is running!"}

@app.get("/api/events", response_model=List[ParisEvent])
async def get_events(limit: int = 20, q: str = None, is_free: bool = False, offset: int = 0):
    return await fetch_paris_events(limit, q, is_free, offset)