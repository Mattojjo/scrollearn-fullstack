import { useState } from 'react';

const AddCardModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onAdd({
        title: title.trim(),
        content: content.trim()
      });
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Failed to add card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Add New Card</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter card title..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition-colors"
              maxLength={255}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/255</p>
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Content
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter card content..."
              rows={6}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition-colors resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 mt-1">{content.length}/1000</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
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
