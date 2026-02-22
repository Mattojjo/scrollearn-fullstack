import { useState, useEffect } from 'react';
import CardScroller from './components/CardScroller';
import AddCardModal from './components/AddCardModal';
import useCards from './hooks/useCards';
import './App.css';

/**
 * Main App Component
 * Renders the main application with card carousel and modal
 */
function App() {
  const { cards, loading, error, loadCards, addCard, removeCard, clearError } = useCards();
  const [showAddModal, setShowAddModal] = useState(false);

  // Load cards on mount
  useEffect(() => {
    loadCards();
  }, [loadCards]);

  // Show loading screen
  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-text">Loading...</div>
      </div>
    );
  }

  /**
   * Handle adding a new card
   * @param {Object} cardData - The card data
   */
  const handleAddCard = async (cardData) => {
    try {
      await addCard(cardData);
      setShowAddModal(false);
    } catch (err) {
      console.error('Failed to add card:', err);
    }
  };

  /**
   * Handle deleting a card
   * @param {number} cardId - The card ID to delete
   */
  const handleDeleteCard = async (cardId) => {
    try {
      await removeCard(cardId);
    } catch (err) {
      console.error('Failed to delete card:', err);
    }
  };

  return (
    <div className="app-container">
      <div className="app-main">
        {/* Error Message */}
        {error && (
          <div className="app-error">
            {error}
            <button
              onClick={clearError}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                marginLeft: '12px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Card Container */}
        <div className="app-card-container">
          {cards.length === 0 ? (
            <div className="app-empty-state">
              <h1>Scrollearn</h1>
              <p>No cards yet. Add one to get started!</p>
              <p>Click the + button in the bottom right corner</p>
            </div>
          ) : (
            <CardScroller cards={cards} onDelete={handleDeleteCard} />
          )}

          {/* Add Button */}
          <button className="app-add-button" onClick={() => setShowAddModal(true)} title="Add new card">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddCardModal onClose={() => setShowAddModal(false)} onAdd={handleAddCard} />
      )}
    </div>
  );
}

export default App;
