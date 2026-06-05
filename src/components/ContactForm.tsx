import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.js';
import { Send } from 'lucide-react';

export function ContactForm() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus({ 
        type: 'success', 
        message: t('contacts.formSuccess') || 'Message sent successfully!' 
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);
    } catch (error) {
      console.error(error);
      setStatus({ 
        type: 'error', 
        message: t('contacts.formError') || 'An error occurred. Please try again later.' 
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t('contacts.contactForm')}
        </h2>
        
        {status.type !== 'idle' && (
          <div className={`p-4 mb-6 rounded-lg ${
            status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
            status.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 
            'bg-blue-50 text-blue-800'
          }`}>
            {status.type === 'loading' ? t('contacts.sending') || 'Sending...' : status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contacts.formName') || "Ім'я"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contacts.formEmail') || "Імейл"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contacts.formPhone') || "Контактний телефон"}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="^\+?[1-9]\d{0,14}$"
              title={t('contacts.formPhoneFormatHint') || "Введіть номер у міжнародному форматі (наприклад, +380XXXXXXXXX)"}
              placeholder="+380"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
            />
            <p className="mt-1 text-xs text-gray-500">
              {t('contacts.formPhoneHint') || "Формат: +380XXXXXXXXX"}
            </p>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contacts.formMessage') || "Звернення"}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full flex justify-center items-center py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5 mr-2" />
            {t('contacts.formSubmit') || "Відправити"}
          </button>
        </form>
      </div>
    </div>
  );
}