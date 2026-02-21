import httpx
from typing import List
from schemas import ParisEvent

PARIS_API_URL = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records"

async def fetch_paris_events(limit: int = 20, query: str = None) -> List[dict]:
    async with httpx.AsyncClient() as client:
        params = {"limit": limit, "order_by": "date_start DESC"}
        
        # Sadece başlık araması kaldı, tertemiz.
        if query and query.strip():
            params["where"] = f'title like "*{query}*"'
            
        response = await client.get(PARIS_API_URL, params=params)
        if response.status_code != 200:
            return []
            
        data = response.json()
        events = []
        for record in data.get("results", []):
            events.append({
                "id": record.get("id"),
                "title": record.get("title"),
                "description": record.get("lead_text"),
                "date_start": record.get("date_start"),
                "date_end": record.get("date_end"),
                "url": record.get("url"),
                "image_url": record.get("cover_url"),
                "address_name": record.get("address_name"),
                "price_type": record.get("price_type")
            })
        return events