'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '../../../../lib/actions/transaction.actions';

export default function ExpenseChart() {
  const { transactions } = useTransactions({ type: 'expense' });
  const { theme } = useTheme();

  const monthlyData = useMemo(() => {
    const monthlyExpenses: Record<string, number> = {};

    transactions.forEach((transaction) => {
      const monthYear = format(new Date(transaction.date), 'MMM yyyy');
      if (!monthlyExpenses[monthYear]) {
        monthlyExpenses[monthYear] = 0;
      }
      monthlyExpenses[monthYear] += transaction.amount;
    });

    return Object.entries(monthlyExpenses)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }, [transactions]);

  return (
    <CardContent>
      <CardTitle className="mb-4">Monthly Expenses</CardTitle>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#020817' : '#fff',
                borderColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
              }}
            />
            <Legend />
            <Bar dataKey="value" name="Expenses" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  );
}