import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, X } from 'lucide-react';
import { productService } from '../../services/productService';
import { CustomerReview } from '../../types';
import { EmptyState } from '../common/EmptyState';
import { useLanguage } from '../../context/LanguageContext';

export const CustomerReviewsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const list = await productService.getProductReviews();
      setReviews(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) return;

    setSubmitting(true);
    try {
      await productService.addReview({
        authorName,
        rating,
        title: title || 'Client Feedback',
        comment,
        verifiedPurchase: true,
      });
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setAuthorName('');
        setTitle('');
        setComment('');
        loadReviews();
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#faf9f6] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2">
              Client Impressions
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-light">
              Verified Customer Reviews
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-white bg-stone-100 hover:bg-stone-900 border border-stone-300 hover:border-stone-900 rounded transition-colors mt-4 sm:mt-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('writeReview')}</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-stone-400 uppercase tracking-widest">
            Loading customer feedback...
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-6">
            <EmptyState
              icon={MessageSquare}
              title="No customer reviews yet"
              description="Customer impressions will appear here once verified orders are delivered. Share your authentic experience to assist fellow patrons."
              actionText="Write First Review"
              onAction={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-white rounded-lg border border-stone-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-stone-800 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-stone-800 text-stone-800" />
                    ))}
                  </div>
                  <h4 className="font-serif-display text-lg text-stone-900 font-medium mb-1">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-medium text-stone-900">{rev.authorName}</span>
                  {rev.verifiedPurchase && (
                    <span className="flex items-center space-x-1 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-[#faf9f6] w-full max-w-md rounded-lg shadow-2xl border border-stone-300 p-6">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                <h3 className="font-serif-display text-xl font-medium text-stone-900">
                  Share Your Feedback
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-serif-display text-xl text-stone-900">Thank you</p>
                  <p className="text-xs text-stone-500">Your review has been verified and recorded.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Farhana S."
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              num <= rating
                                ? 'fill-stone-900 text-stone-900'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The drape and collar stitch are impeccable"
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Your Experience *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe the fabric feel, fit across shoulders, and overall craftsmanship..."
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-stone-800"
                    />
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 uppercase tracking-wider text-[11px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded uppercase tracking-wider font-semibold text-[11px] transition-colors"
                    >
                      {submitting ? 'Submitting...' : 'Post Review'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
