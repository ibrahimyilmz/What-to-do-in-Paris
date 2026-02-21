import axios from 'axios';
import type { ParisEvent } from '../types/event';

const API_BASE_URL = 'http://localhost:8000/api'; // FastAPI adresin

export const fetchEvents = async (limit: number = 20, query?: string, category?: string): Promise<ParisEvent[]> => {
    const response = await axios.get<ParisEvent[]>(`${API_BASE_URL}/events`, {
        params: { limit, q: query, category: category }
    });
    return response.data;
};