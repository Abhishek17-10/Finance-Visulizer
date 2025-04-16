'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTransactions } from '@/lib/actions/transaction.actions';
import { format } from 'date-fns';
import { CATEGORIES } from '@/constants/categories';
import { Button } from '@/components/ui/button';
import { PenIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/sonner';

export default function TransactionList() {
  const { transactions, refetch } = useTransactions({ type: undefined });

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      await refetch();
      toast.success('Transaction deleted');
    } catch (error) {
      toast.error('Error deleting transaction', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground mb-4">No transactions yet</p>
        <p className="text-sm text-muted-foreground">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id as string}>
              <TableCell className="font-medium">
                {format(new Date(transaction.date), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {CATEGORIES[transaction.category as keyof typeof CATEGORIES]}
              </TableCell>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell className={`text-right ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                {transaction.type === 'expense' ? '-' : ''}${transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/transactions/${transaction._id}`}>
                      <PenIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(transaction._id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}