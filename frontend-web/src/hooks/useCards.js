/**
 * useCards Hook
 * Custom hook to manage card state and API operations
 */

import { useState, useCallback } from 'react';
import { fetchCards, createCard, deleteCard } from '../api/cardApi';

export const useCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load all cards from the API
   */
  const loadCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCards();
      setCards(data);
    } catch (err) {
      setError('Failed to load cards. Make sure the backend is running on port 8001.');
      console.error('Error loading cards:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Add a new card
   * @param {Object} cardData - The card data
   * @param {string} cardData.title - Card title
   * @param {string} cardData.content - Card content
   */
  const addCard = useCallback(async (cardData) => {
    try {
      await createCard(cardData);
      await loadCards(); // Reload cards after adding
    } catch (err) {
      setError('Failed to add card');
      console.error('Error adding card:', err);
      throw err;
    }
  }, [loadCards]);

  /**
   * Remove a card by ID
   * @param {number} cardId - The card ID to delete
   */
  const removeCard = useCallback(async (cardId) => {
    try {
      await deleteCard(cardId);
      await loadCards(); // Reload cards after deleting
    } catch (err) {
      setError('Failed to delete card');
      console.error('Error deleting card:', err);
      throw err;
    }
  }, [loadCards]);

  /**
   * Clear any error messages
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    cards,
    loading,
    error,
    loadCards,
    addCard,
    removeCard,
    clearError,
  };
};

export default useCards;
