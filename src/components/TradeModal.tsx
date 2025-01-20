'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TradeModal({ isOpen, onClose }: TradeModalProps) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(formData.get('amount')),
          price: Number(formData.get('price')),
          paymentMethod: formData.get('paymentMethod'),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create trade');
      }

      router.refresh();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Trade</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount (in crypto)
            </label>
            <input
              type="number"
              name="amount"
              step="0.000001"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (in IRR)
            </label>
            <input
              type="number"
              name="price"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a payment method</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="card">Card Payment</option>
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Trade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
