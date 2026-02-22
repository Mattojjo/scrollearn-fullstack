import { useState } from 'react';
import './AddCardModal.css';

/**
 * AddCardModal Component
 * Modal dialog for adding a new card
 */
const AddCardModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Clear error when user starts typing
   */
  const handleClearError = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError('');
  };

  /**
   * Validate form inputs
   * @returns {boolean} True if valid, false otherwise
   */
  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }

    if (!content.trim()) {
      setError('Content is required');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onAdd({
        title: title.trim(),
        content: content.trim(),
      });
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Failed to add card. Please try again.');
      console.error('Error adding card:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>Add New Card</h2>
          <button className="modal-close-button" onClick={onClose} title="Close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title Input */}
          <div className="modal-form-group">
            <label htmlFor="card-title">Card Title</label>
            <input
              id="card-title"
              type="text"
              value={title}
              onChange={handleClearError(setTitle)}
              placeholder="Enter card title..."
              maxLength={255}
              autoFocus
            />
            <p className="modal-form-counter">{title.length}/255</p>
          </div>

          {/* Content Textarea */}
          <div className="modal-form-group">
            <label htmlFor="card-content">Card Content</label>
            <textarea
              id="card-content"
              value={content}
              onChange={handleClearError(setContent)}
              placeholder="Enter card content..."
              maxLength={1000}
            />
            <p className="modal-form-counter">{content.length}/1000</p>
          </div>

          {/* Error Message */}
          {error && <div className="modal-form-error">{error}</div>}

          {/* Buttons */}
          <div className="modal-form-buttons">
            <button
              type="button"
              className="modal-form-button modal-form-button-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-form-button modal-form-button-submit"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
