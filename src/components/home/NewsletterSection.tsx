import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const NewsletterSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      try {
        const stored = JSON.parse(localStorage.getItem('atelier_subscribers') || '[]');
        if (!stored.includes(email)) {
          stored.push(email);
          localStorage.setItem('atelier_subscribers', JSON.stringify(stored));
        }
      } catch (err) {
        console.error(err);
      }
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#f7f5f0] border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-10 h-10 rounded-full bg-stone-200/80 text-stone-700 flex items-center justify-center mx-auto mb-4 border border-stone-300">
          <Mail className="w-4 h-4 stroke-[1.5]" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2">
          Exclusive Previews & Archive Releases
        </p>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-light mb-3">
          Join The Atelier Registry
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-8 leading-relaxed">
          Be first to receive notice of small-batch organic fabric harvests, seasonal color drops, and private subscriber events.
        </p>

        {submitted ? (
          <div className="inline-flex items-center space-x-2 px-5 py-3 bg-white border border-stone-200 rounded-lg shadow-xs text-xs text-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>You have been registered. Watch your inbox for our upcoming collection release.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white border border-stone-300 rounded px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
            >
              <span>{language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400 mt-4">
          We honor your privacy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};
