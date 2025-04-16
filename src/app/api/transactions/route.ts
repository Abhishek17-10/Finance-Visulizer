import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/Database/connect';
import Transaction from '../../../models/Transaction.model';
import { CATEGORIES } from '@/constants/categories';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const query: Record<string, unknown> = {};

    if (type) {
      query.type = type;
    }

    if (month && year) {
      const startDate = new Date(Number(year), Number(month) - 1, 1);
      const endDate = new Date(Number(year), Number(month), 0);

      query.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.amount || !body.description || !body.category || !body.type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!Object.keys(CATEGORIES).includes(body.category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const transaction = await Transaction.create(body);

    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}