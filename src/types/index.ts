export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  account?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  type?: 'income' | 'expense' | 'both';
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
}

export interface FilterOptions {
  dateRange?: {
    start: Date;
    end: Date;
  };
  type?: 'income' | 'expense' | 'all';
  category?: string;
  search?: string;
}

export interface SortOptions {
  field: 'date' | 'amount' | 'category' | 'description';
  direction: 'asc' | 'desc';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'small' | 'medium' | 'large';
  title?: string;
  children: React.ReactNode;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  group?: string;
}

export interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}