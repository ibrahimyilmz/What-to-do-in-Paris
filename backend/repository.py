import httpx
from typing import List, Optional

PARIS_API_URL = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records"

class ParisEventRepository:
    @staticmethod
    async def get_raw_events(limit: int, query: Optional[str]) -> List[dict]:
        async with httpx.AsyncClient() as client:
            params = {"limit": limit, "order_by": "date_start DESC"}
            if query and query.strip():
                params["where"] = f'title like "*{query}*"'
                
            response = await client.get(PARIS_API_URL, params=params)
            response.raise_for_status()
            return response.json().get("results", [])