import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  key: string;
  color: string;
  icon?: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
  title: string;
}

interface ExpenseState {
  expenses: Expense[];
  categories: Category[];
  selectedCategory: Category | null;
}

const initialCategories: Category[] = [
  { key: "Food & Drinks", color: "#F04438" },
  { key: "Housing", color: "#FACC15" },
  { key: "Shopping", color: "#F97316" },
  { key: "Family", color: "#039855" },
  { key: "Transportation", color: "#005EE8" },
  { key: "Travel/Vacation", color: "#800080" },
  { key: "Entertainment", color: "#1F2937" },
  { key: "Health", color: "#EF4444" },
];

const initialExpenses: Expense[] = [
  {
    id: '1',
    title: 'Cooking gas',
    amount: 12000,
    category: { key: 'Housing', color: '#FACC15' },
    date: '2024-01-16',
    note: 'Monthly gas refill'
  },
  {
    id: '2',
    title: 'A/C Repair',
    amount: 36000,
    category: { key: 'Transportation', color: '#005EE8' },
    date: '2024-01-16',
    note: 'Car maintenance'
  },
  {
    id: '3',
    title: 'Pizza Delivery',
    amount: 4500,
    category: { key: 'Food & Drinks', color: '#F04438' },
    date: '2024-01-15',
    note: 'Weekend dinner'
  },
  {
    id: '4',
    title: 'Netflix Subscription',
    amount: 2200,
    category: { key: 'Entertainment', color: '#1F2937' },
    date: '2024-01-14',
    note: 'Monthly subscription'
  },
  {
    id: '5',
    title: 'Medical Checkup',
    amount: 15000,
    category: { key: 'Health', color: '#EF4444' },
    date: '2024-01-13',
    note: 'Annual checkup'
  },
];

const initialState: ExpenseState = {
  expenses: initialExpenses,
  categories: initialCategories,
  selectedCategory: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
      const newExpense: Expense = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.expenses.unshift(newExpense);
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addExpense, setSelectedCategory, addCategory } = expenseSlice.actions;
export default expenseSlice.reducer;