import diskcache
from typing import List
from repository import ParisEventRepository
from utils import calculate_distance

cache = diskcache.Cache('event_cache')
CACHE_EXPIRE = 600
USER_HOME = {"lat": 48.8396, "lon": 2.5833}

async def fetch_paris_events(limit: int = 20, query: str = None, is_free: bool = False) -> List[dict]:
    cache_key = f"events_{limit}_{query or 'all'}_free_{is_free}"
    
    if cache_key in cache:
        print("Cache hit for paris events")
        return cache[cache_key]

    # Repository katmanından ham veriyi al
    raw_results = await ParisEventRepository.get_raw_events(limit, query, is_free)
    
    events = []
    for record in raw_results:
        coords = record.get("lat_lon", {})
        
        # İş mantığı (Business Logic): Mesafe hesaplama servis katmanında kalır
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
    
    cache.set(cache_key, events, expire=CACHE_EXPIRE)
    return events