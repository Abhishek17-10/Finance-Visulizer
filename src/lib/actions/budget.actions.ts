'use client';

import { useQuery } from '@tanstack/react-query';
import { IBudget } from '../../models/Budget.model';
import { toast } from '@/components/ui/sonner';
import { useState } from 'react';

export function useBudget() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchBudgets = async (): Promise<IBudget[]> => {
    const response = await fetch('/api/budgets');
    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }
    return response.json();
  };

  const { data: budgets = [], refetch } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets,
  });

  const createBudget = async (data: Omit<IBudget, '_id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create budget');
      }

      await refetch();
      toast.success('Budget created', {
        description: 'Your budget has been successfully set.',
      });
    } catch (error) {
      toast.error('Error', {
        description: error instanceof Error ? error.message : 'Failed to create budget',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { budgets, createBudget, isLoading, refetch };
}