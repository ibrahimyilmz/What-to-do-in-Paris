import httpx
from typing import List
from schemas import ParisEvent
from utils import calculate_distance

USER_HOME = {"lat": 48.8396, "lon": 2.5833}

PARIS_API_URL = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records"

async def fetch_paris_events(limit: int = 20, query: str = None) -> List[dict]:
    async with httpx.AsyncClient() as client:
        params = {"limit": limit, "order_by": "date_start DESC"}
        
        if query and query.strip():
            params["where"] = f'title like "*{query}*"'
            
        response = await client.get(PARIS_API_URL, params=params)
        if response.status_code != 200:
            return []
            
        data = response.json()
        events = []
        for record in data.get("results", []):
            coords = record.get("lat_lon", {})

            # Mesafeyi backend'de hesaplıyoruz
            distance = calculate_distance(
                USER_HOME["lat"], USER_HOME["lon"], 
                coords.get("lat"), coords.get("lon")
            )
            
            events.append({
                "id": record.get("id"),
                "title": record.get("title"),
                "description": record.get("lead_text"),
                "date_start": record.get("date_start"),
                "date_end": record.get("date_end"),
                "url": record.get("url"),
                "image_url": record.get("cover_url"),
                "address_name": record.get("address_name"),
                "lat": coords.get("lat"),
                "lon": coords.get("lon"),
                "distance": distance,
                "price_type": record.get("price_type")
            })
        return events