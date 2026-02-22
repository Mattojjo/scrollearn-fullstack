import { useState, useEffect } from 'react';
import CardScroller from './components/CardScroller';
import AddCardModal from './components/AddCardModal';

const API_BASE_URL = `http://${window.location.hostname}:8001`;

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/items/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error loading cards:', error);
      setError('Failed to load cards. Make sure the backend is running on port 8001.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (cardData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardData.title,
          description: cardData.content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create card');
      }

      await loadCards();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding card:', error);
      setError('Failed to add card');
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${cardId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete card');
      }

      await loadCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      setError('Failed to delete card');
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {error && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-red-500 text-white p-4 text-center">
          {error}
        </div>
      )}
      
      <CardScroller 
        cards={cards} 
        onDelete={handleDeleteCard}
      />
      
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110"
        title="Add new card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {showAddModal && (
        <AddCardModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCard}
        />
      )}
    </div>
  );
}

export default App;
