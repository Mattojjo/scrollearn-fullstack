import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface Card {
  id: number;
  name: string;
  description: string;
  date: string;
  user_id: number;
}

export interface CreateCardData {
  name: string;
  description?: string;
}

// Get all cards
export const fetchCards = async (): Promise<Card[]> => {
  const response = await apiClient.get('/items/');
  return response.data;
};

// Create a new card
export const createCard = async (data: CreateCardData): Promise<Card> => {
  const response = await apiClient.post('/items/', {
    name: data.name,
    description: data.description || '',
  });
  return response.data;
};

// Delete a card
export const deleteCard = async (id: number): Promise<void> => {
  await apiClient.delete(`/items/${id}`);
};

// Get a single card
export const getCard = async (id: number): Promise<Card> => {
  const response = await apiClient.get(`/items/${id}`);
  return response.data;
};

// Update a card
export const updateCard = async (
  id: number,
  data: Partial<CreateCardData>
): Promise<Card> => {
  const response = await apiClient.put(`/items/${id}`, data);
  return response.data;
};
