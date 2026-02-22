/**
 * API Utility Module
 * Handles all API communication with the backend
 */

const API_BASE_URL = `http://${window.location.hostname}:8001`;

const API_CONFIG = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Fetch all cards from the backend
 * @returns {Promise<Array>} Array of cards
 * @throws {Error} If the request fails
 */
export const fetchCards = async () => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/items/`, {
      method: 'GET',
      headers: API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

/**
 * Create a new card
 * @param {Object} cardData - The card data
 * @param {string} cardData.title - Card title
 * @param {string} cardData.content - Card content
 * @returns {Promise<Object>} Created card
 * @throws {Error} If the request fails
 */
export const createCard = async (cardData) => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/items/`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        name: cardData.title,
        description: cardData.content,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create card');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
};

/**
 * Delete a card
 * @param {number} cardId - The card ID to delete
 * @returns {Promise<void>}
 * @throws {Error} If the request fails
 */
export const deleteCard = async (cardId) => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/items/${cardId}`, {
      method: 'DELETE',
      headers: API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to delete card');
    }
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
};

export default {
  fetchCards,
  createCard,
  deleteCard,
};
