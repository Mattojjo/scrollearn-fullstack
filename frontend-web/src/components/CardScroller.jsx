import { useState, useRef, useEffect } from 'react';

const CardScroller = ({ cards, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientY);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe up - next card
      goToNext();
    }
    if (isRightSwipe) {
      // Swipe down - previous card
      goToPrevious();
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') goToNext();
      if (e.key === 'ArrowUp') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length]);

  if (cards.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Scrollearn</h1>
          <p className="text-gray-300 mb-8">No cards yet. Add one to get started!</p>
          <p className="text-gray-400 text-sm mb-12">Tap the + button to create a card</p>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black to-transparent p-4">
        <h1 className="text-2xl font-bold text-white text-center">Scrollearn</h1>
        <p className="text-gray-400 text-center text-sm mt-1">
          {currentIndex + 1} / {cards.length}
        </p>
      </div>

      {/* Card Container */}
      <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md h-full flex items-center justify-center">
          {/* Card */}
          <div className="w-full h-4/5 max-h-[600px] bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
                {currentCard.name}
              </h2>
              <p className="text-white text-opacity-90 text-lg leading-relaxed">
                {currentCard.description}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white text-opacity-60 text-sm">
                {new Date(currentCard.date).toLocaleDateString()}
              </span>
              <span className="text-white text-opacity-60 text-lg">💡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-4 px-4 md:px-8">
        <button
          onClick={() => setDeleteConfirm(currentCard.id)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all"
          title="Delete card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        <button
          onClick={goToPrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-all"
          title="Previous card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-all"
          title="Next card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 space-y-2 hidden md:flex md:flex-col">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-2 h-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Swipe Indicator for Mobile */}
      <div className="absolute bottom-32 left-0 right-0 z-10 flex justify-center pointer-events-none md:hidden">
        <div className="text-gray-400 text-xs animate-pulse">
          ↑ Swipe to browse ↓
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-slideUp">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Card?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{currentCard.name}"? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(deleteConfirm);
                  setDeleteConfirm(null);
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
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
