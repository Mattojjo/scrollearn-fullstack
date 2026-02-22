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
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '448px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'linear-gradient(to right, #9333ea, #3b82f6)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Add New Card</h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title Input */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
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
              style={{
                width: '100%',
                padding: '8px 16px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#9333ea'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              maxLength={255}
            />
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', margin: 0 }}>{title.length}/255</p>
          </div>

          {/* Content Textarea */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
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
              style={{
                width: '100%',
                padding: '8px 16px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                resize: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#9333ea'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              maxLength={1000}
            />
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', margin: 0 }}>{content.length}/1000</p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ padding: '12px', backgroundColor: '#fef2f2', border: '2px solid #fecaca', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: '#991b1b', margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '8px 16px',
                border: '2px solid #d1d5db',
                color: '#374151',
                fontWeight: '600',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.5 : 1,
                pointerEvents: loading ? 'none' : 'auto'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '8px 16px',
                background: 'linear-gradient(to right, #9333ea, #3b82f6)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.5 : 1,
                pointerEvents: loading ? 'none' : 'auto'
              }}
              onMouseEnter={(e) => e.target.style.filter = 'brightness(1.1)'}
              onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
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
