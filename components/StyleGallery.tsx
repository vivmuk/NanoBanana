import React, { useState, useMemo, useEffect } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { Copy, Check, ArrowRight, Search, Filter } from 'lucide-react';
import { ImagePreviewModal } from './ImagePreviewModal';

interface StyleGalleryProps {
  onSelectPrompt: (prompt: string) => void;
}

export const StyleGallery: React.FC<StyleGalleryProps> = ({ onSelectPrompt }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{
    imageUrl: string;
    title: string;
    description: string;
    category: string;
  } | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(GALLERY_ITEMS.map(item => item.category));
    return ['All', ...Array.from(cats).sort()];
  }, [GALLERY_ITEMS]);

  // If the gallery data changes (e.g. via Fast Refresh), ensure category stays valid
  useEffect(() => {
    if (selectedCategory !== 'All' && !categories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [categories, selectedCategory]);

  // Filter items
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, GALLERY_ITEMS]);

  return (
    <div className="w-full h-full flex flex-col bg-obsidian-950">
      
      {/* Sticky Header Section */}
      <div className="flex-none p-4 md:p-8 bg-obsidian-950/95 backdrop-blur z-20 sticky top-0 border-b border-gray-800">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Title & Description */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Style <span className="text-banana-400">Universe</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl">
                Browse {GALLERY_ITEMS.length}+ curated styles for Nano Banana Pro. 
                Select a style to start building your prompt.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-xl leading-5 bg-obsidian-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 sm:text-sm transition-all"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar mask-gradient-right">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0 mr-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-banana-400 text-obsidian-950 border-banana-400 shadow-[0_0_10px_rgba(255,225,53,0.3)]'
                    : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
               <Search className="w-12 h-12 mb-4 opacity-20" />
               <p className="text-lg">No styles found for "{searchQuery}"</p>
               <button 
                 onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                 className="mt-4 text-banana-400 hover:underline text-sm"
               >
                 Clear filters
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-obsidian-900 border border-gray-800 rounded-xl overflow-hidden hover:border-banana-400/40 transition-all duration-300 hover:shadow-xl flex flex-col h-[320px]"
                >
                  {/* Image Area */}
                  <div 
                    className="relative h-40 overflow-hidden bg-gray-900 flex-shrink-0 cursor-pointer"
                    onClick={() => setPreviewImage({
                      imageUrl: item.imageUrl,
                      title: item.title,
                      description: item.description,
                      category: item.category
                    })}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 to-transparent z-10 opacity-60" />
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" 
                    />
                    <div className="absolute top-3 left-3 z-20">
                       <span className="text-[10px] font-bold font-mono text-obsidian-950 bg-banana-400/90 px-2 py-0.5 rounded shadow-sm">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <span className="text-xs font-semibold text-white bg-banana-400/90 text-obsidian-950 px-3 py-1.5 rounded-lg shadow-lg">
                        Click to preview
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-100 leading-tight mb-1 group-hover:text-banana-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs line-clamp-2">
                            {item.description}
                        </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button 
                             onClick={() => onSelectPrompt(`I want to create something like the ${item.title}: ${item.description}`)}
                             className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-800 hover:bg-banana-400 hover:text-obsidian-950 text-gray-300 rounded-lg text-xs font-bold transition-all group-hover:bg-banana-400 group-hover:text-obsidian-950"
                        >
                            <span>Build</span>
                            <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(item.promptSnippet);
                                setCopiedId(item.id);
                                setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className={`flex-none p-2 rounded-lg transition-all duration-200 border ${
                                copiedId === item.id
                                    ? 'bg-green-500/20 text-green-400 border-green-500/40 scale-110'
                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border-gray-700'
                            }`}
                            title={copiedId === item.id ? 'Copied!' : 'Copy prompt snippet'}
                        >
                            {copiedId === item.id
                                ? <Check className="w-4 h-4" />
                                : <Copy className="w-4 h-4" />
                            }
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <ImagePreviewModal
          imageUrl={previewImage.imageUrl}
          title={previewImage.title}
          description={previewImage.description}
          category={previewImage.category}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
};
