from pydantic import BaseModel
from typing import Optional

class ParisEvent(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    date_start: Optional[str] = None
    date_end: Optional[str] = None
    url: Optional[str] = None
    image_url: Optional[str] = None
    address_name: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    distance: Optional[float] = None
    price_type: Optional[str] = None