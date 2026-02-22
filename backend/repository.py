import os
import httpx
from dotenv import load_dotenv
from typing import List, Optional

load_dotenv()

PARIS_API_URL = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records"
class ParisEventRepository:
    @staticmethod
    async def get_raw_events(limit: int, query: Optional[str], is_free: bool = False, offset: int = 0) -> List[dict]:
        async with httpx.AsyncClient() as client:
            params = {"limit": limit, "offset": offset, "order_by": "date_start DESC"}
            where_clauses = []

            if query and query.strip():
                where_clauses.append(f'title like "*{query}*"')

            if is_free:
                where_clauses.append("price_type='gratuit'")

            if where_clauses:
                params["where"] = " AND ".join(where_clauses)
                
            response = await client.get(PARIS_API_URL, params=params)
            response.raise_for_status()
            return response.json().get("results", [])

class TravelTimeRepository:
    _TOKEN = os.getenv("TRAVEL_TIME_TOKEN")
    _BASE_URL = "https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys"

    @classmethod
    async def get_travel_duration(cls, from_lat, from_lon, to_lat, to_lon) -> Optional[int]:
        if not all([from_lat, from_lon, to_lat, to_lon]):
            return None

        headers = {"apikey": cls._TOKEN}
        
        params = {
            "from": f"{from_lon};{from_lat}",
            "to": f"{to_lon};{to_lat}",
            "limit": 1
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(cls._BASE_URL, headers=headers, params=params)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("journeys"):
                        return data["journeys"][0]["duration"] // 60
                else:
                    print(f"PRIM API Error: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"TravelTime Exception: {e}")
            return None
        return None