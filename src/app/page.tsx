import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Wallet, PieChart, BarChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Personal Finance Visualizer</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Track, analyze, and visualize your personal finances in one place
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Track all your income and expenses with detailed categorization
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/transactions">
                View Transactions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Visualize your spending patterns with interactive category breakdowns
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">
                View Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budgeting</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Set budgets and track your progress against spending goals
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">
                Manage Budgets <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}