export type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Health"
  | "Entertainment"
  | "Bills"
  | "Other";

export interface Expense {
  id:       string;
  title:    string;
  amount:   number;
  category: Category;
  date:     string;
}

export interface CategoryMeta {
  label: Category;
  icon:  string;
  color: string;
  glow:  string;
  bg:    string;
}