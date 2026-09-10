import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { productService } from '../../services/productService';
import { CATEGORIES } from '../../data/categories';
import { Product } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onProductAdded,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('25');
  const [selectedSizes, setSelectedSizes] = useState<('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[]>([
    'S',
    'M',
    'L',
  ]);
  const [colorsInput, setColorsInput] = useState('Raw White, Noir Black, Oat Melange');
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleSize = (size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    setSubmitting(true);
    try {
      const colors = colorsInput
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      const parsedPrice = parseFloat(price);
      const parsedOriginal = originalPrice ? parseFloat(originalPrice) : undefined;
      const discountPercent =
        parsedOriginal && parsedOriginal > parsedPrice
          ? Math.round(((parsedOriginal - parsedPrice) / parsedOriginal) * 100)
          : undefined;

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const created = await productService.createProduct({
        name,
        slug,
        description,
        price: parsedPrice,
        originalPrice: parsedOriginal,
        discountPercent,
        images: imageUrl.trim() ? [imageUrl.trim()] : [],
        colors: colors.length > 0 ? colors : ['Standard'],
        sizes: selectedSizes,
        category,
        stock: parseInt(stock, 10) || 10,
        isNew,
        isBestSeller,
        reviewsCount: 0,
      });

      onProductAdded(created);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-[#faf9f6] w-full max-w-xl rounded-lg shadow-2xl border border-stone-300 overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="font-serif-display text-2xl font-medium text-stone-900">
                Add Real Product
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Enter genuine inventory details. These persist into the production data store.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pure Combed Heavyweight Crewneck"
                className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Price (৳) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1250"
                  className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Original Price (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="1500"
                  className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Category Silhouette
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Product Image URL (Optional)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... (or leave blank for clean empty state)"
                  className="w-full bg-white border border-stone-300 rounded px-3 py-2 pl-9 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
                />
                <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="220 GSM single-jersey organic cotton, double-needle collar stitch..."
                className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => {
                  const active = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSize(sz)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
                        active
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-600'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Colors (comma separated)
              </label>
              <input
                type="text"
                value={colorsInput}
                onChange={(e) => setColorsInput(e.target.value)}
                placeholder="Raw White, Noir Black, Oat"
                className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>

            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-500"
                />
                <span>Tag as New Arrival</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-500"
                />
                <span>Tag as Best Seller</span>
              </label>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-stone-800 transition-colors flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{submitting ? 'Saving...' : 'Save Product'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
