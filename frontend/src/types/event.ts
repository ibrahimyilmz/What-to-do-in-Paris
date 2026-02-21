export interface ParisEvent {
    id: string;
    title: string;
    description?: string;
    date_start?: string;
    date_end?: string;
    url?: string;
    image_url?: string;
    address_name?: string;
    category?: string;
    price_type?: string;
    distance?: number;
    travel_time?: number;
    lat?: number;
    lon?: number;
}