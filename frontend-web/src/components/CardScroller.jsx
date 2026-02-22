import { useState, useRef, useEffect } from 'react';
import './CardScroller.css';

/**
 * CardScroller Component
 * Carousel component for browsing cards with swipe and keyboard navigation
 */
const CardScroller = ({ cards, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('down');
  const containerRef = useRef(null);

  const MIN_SWIPE_DISTANCE = 50;

  /**
   * Handle touch start
   */
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  /**
   * Handle touch end
   */
  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientY);
    performSwipe(touchStart, e.changedTouches[0].clientY);
  };

  /**
   * Perform swipe action
   */
  const performSwipe = (start, end) => {
    if (!start || !end) return;

    const distance = start - end;
    const isSwipeUp = distance > MIN_SWIPE_DISTANCE;
    const isSwipeDown = distance < -MIN_SWIPE_DISTANCE;

    if (isSwipeUp) {
      setScrollDirection('up');
      goToNext();
    } else if (isSwipeDown) {
      setScrollDirection('down');
      goToPrevious();
    }
  };

  /**
   * Go to next card
   */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  /**
   * Go to previous card
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  /**
   * Go to specific card
   */
  const goToCard = (index) => {
    setCurrentIndex(index);
  };

  /**
   * Handle keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') goToNext();
      if (e.key === 'ArrowUp') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length]);

  /**
   * Handle card deletion
   */
  const handleDelete = async () => {
    try {
      await onDelete(deleteConfirm);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting card:', err);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div
      ref={containerRef}
      className="card-scroller"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="card-header">
        <h1>Scrollearn</h1>
        <p className="card-header-counter">
          {currentIndex + 1} / {cards.length}
        </p>
      </div>

      {/* Card Container */}
      <div className="card-container">
        <div className="card-wrapper">
          {/* Card */}
          <div className={`card card-${scrollDirection}`}>
            {/* Card Title Section */}
            <div className="card-title-section">
              <h2>{currentCard.name}</h2>
            </div>

            {/* Card Separator */}
            <div className="card-separator"></div>

            {/* Card Description Section */}
            <div className="card-description-section">
              <p>{currentCard.description}</p>
            </div>

            {/* Card Footer */}
            <div className="card-footer">
              <span className="card-date">{new Date(currentCard.date).toLocaleDateString()}</span>
              <span className="card-icon">💡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button
          className="card-action-button delete"
          onClick={() => setDeleteConfirm(currentCard.id)}
          title="Delete card"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>

        <button
          className="card-action-button"
          onClick={goToPrevious}
          title="Previous card"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <button
          className="card-action-button"
          onClick={goToNext}
          title="Next card"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="card-navigation">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`card-nav-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToCard(index)}
            title={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe Hint for Mobile */}
      <div className="card-swipe-hint">
        <div className="card-swipe-hint-text">↑ Swipe to browse ↓</div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="card-delete-modal">
          <div className="card-delete-content">
            <h3>Delete Card?</h3>
            <p>Are you sure you want to delete "{currentCard.name}"? This action cannot be undone.</p>

            <div className="card-delete-buttons">
              <button
                className="card-delete-button"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="card-delete-button danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardScroller;
