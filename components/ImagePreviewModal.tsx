import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  imageUrl,
  title,
  description,
  category,
  onClose
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-obsidian-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-mono text-obsidian-950 bg-banana-400/90 px-2 py-1 rounded">
                {category}
              </span>
              <h3 className="text-xl font-bold text-gray-100">{title}</h3>
            </div>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-obsidian-950">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-xl"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <p className="text-xs text-gray-500 text-center">
            Press ESC or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
};














