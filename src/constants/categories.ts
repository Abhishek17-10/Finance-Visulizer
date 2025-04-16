export const CATEGORIES = {
    food: 'Food',
    transportation: 'Transportation',
    housing: 'Housing',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    education: 'Education',
    shopping: 'Shopping',
    utilities: 'Utilities',
    other: 'Other',
  } as const;
  
  export type Category = keyof typeof CATEGORIES;