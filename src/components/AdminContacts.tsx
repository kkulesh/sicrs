import React, { useEffect, useState } from 'react';

interface ContactData {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export function AdminContacts() {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchContacts = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/get_contacts.php', {
        headers: { 'X-Admin-Token': token }
      });
      const result = await response.json();
      if (result.success) {
        setContacts(result.data);
        setAuthenticated(true);
      } else if (response.status === 429) {
        setError('Забагато невдалих спроб. Зачекайте 5 хвилин.');
        setAuthenticated(false);
      } else if (response.status === 401) {
        setError('Невірний пароль.');
        setAuthenticated(false);
      } else {
        setError(result.error || 'Помилка завантаження.');
      }
    } catch {
      setError('Помилка мережі: не вдалося підключитись до сервера.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchContacts(password);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Адмін панель</h2>
          <p className="text-gray-500 text-sm mb-6">Введіть пароль для доступу до звернень.</p>
          {error && <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded p-3">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Вхід...' : 'Увійти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-12 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-900">Отримані звернення</h2>
        <span className="text-sm text-gray-500">{contacts.length} записів</span>
      </div>
      
      {contacts.length === 0 && (
        <p className="text-gray-600">Звернень ще немає.</p>
      )}

      {contacts.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ім'я</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Звернення</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{contact.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(contact.created_at).toLocaleString('uk-UA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
