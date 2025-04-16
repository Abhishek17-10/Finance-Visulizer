// src/lib/actions/transaction.actions.ts
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { ITransaction } from '../../models/Transaction.model';
import { toast } from '@/components/ui/sonner';

export function useTransactions({ type }: { type?: 'expense' | 'income' }) {
  const fetchTransactions = async (): Promise<ITransaction[]> => {
    const response = await fetch(`/api/transactions?type=${type || ''}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  return useQuery({
    queryKey: ['transactions', type],
    queryFn: fetchTransactions,
    onError: (error) => {
      toast.error('Failed to load transactions', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}

export function useCreateTransaction() {
  return useMutation({
    mutationFn: async (newTransaction: Omit<ITransaction, '_id'>) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Transaction created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create transaction', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}