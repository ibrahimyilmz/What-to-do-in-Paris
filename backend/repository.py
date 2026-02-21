import httpx
from typing import List, Optional

PARIS_API_URL = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records"

class ParisEventRepository:
    @staticmethod
    async def get_raw_events(limit: int, query: Optional[str], is_free: bool = False, offset: int = 0) -> List[dict]:
        async with httpx.AsyncClient() as client:
            params = {"limit": limit, "offset": offset, "order_by": "date_start DESC"} # offset eklendi
            where_clauses = []
            
            # Başlık filtresi
            if query and query.strip():
                where_clauses.append(f'title like "*{query}*"')
            
            # Ücretsiz filtresi (Paris API'sinde 'gratuit' olarak tutulur)
            if is_free:
                where_clauses.append("price_type='gratuit'")
                
            # Filtreleri AND ile birleştiriyoruz
            if where_clauses:
                params["where"] = " AND ".join(where_clauses)
                
            response = await client.get(PARIS_API_URL, params=params)
            response.raise_for_status()
            return response.json().get("results", [])