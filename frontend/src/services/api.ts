import axios from 'axios';
import type { ParisEvent } from '../types/event';

const API_BASE_URL = 'http://localhost:8000/api'; // FastAPI adresin

export const fetchEvents = async (limit: number = 20, query?: string, isFree: boolean = false, offset: number = 0): Promise<ParisEvent[]> => {
    const response = await axios.get<ParisEvent[]>(`${API_BASE_URL}/events`, {
        params: { limit, q: query, is_free: isFree, offset }
    });
    return response.data;
};