// ─── Meal Planning ────────────────────────────────────────────────────────────

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type DietaryTag =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "dairy-free"
  | "keto"
  | "high-protein"
  | "low-carb";

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  description: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  calories: number;
  cost: number;
  dietaryTags: DietaryTag[];
  imageUrl?: string;
  ingredients: string[];
  steps: string[];
}

export interface DayMealPlan {
  date: string; // ISO date string
  dayName: string;
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
  snack?: Meal;
}

export interface MealPlan {
  id: string;
  weekStart: string; // ISO date string
  weekEnd: string;
  days: DayMealPlan[];
  totalCost: number;
  totalCalories: number;
}

// ─── Grocery ──────────────────────────────────────────────────────────────────

export type GroceryCategory =
  | "produce"
  | "proteins"
  | "dairy"
  | "grains"
  | "pantry"
  | "frozen"
  | "beverages"
  | "snacks"
  | "condiments"
  | "other";

export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  unit: string;
  estimatedPrice: number;
  actualPrice?: number;
  checked: boolean;
  notes?: string;
  brand?: string;
  mealId?: string; // linked meal
}

export interface GroceryList {
  id: string;
  weekStart: string;
  items: GroceryItem[];
  totalEstimated: number;
  totalActual: number;
}

// ─── Budget ───────────────────────────────────────────────────────────────────

export interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

export interface BudgetData {
  id: string;
  month: string;
  totalBudget: number;
  totalSpent: number;
  categories: BudgetCategory[];
  weeklyBreakdown: {
    week: string;
    budgeted: number;
    spent: number;
  }[];
}

// ─── Cooking ──────────────────────────────────────────────────────────────────

export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface CookingTask {
  id: string;
  title: string;
  description: string;
  mealId?: string;
  mealName?: string;
  estimatedMinutes: number;
  priority: TaskPriority;
  status: TaskStatus;
  scheduledFor?: string; // ISO datetime
  steps: string[];
  tags: string[];
}

// ─── Substitutions ────────────────────────────────────────────────────────────

export interface Substitution {
  id: string;
  original: string;
  alternatives: {
    name: string;
    ratio: string; // e.g. "1:1", "3/4 cup per 1 cup"
    notes: string;
    dietaryTags: DietaryTag[];
  }[];
  category: GroceryCategory;
  reason: string; // e.g. "allergy", "budget", "availability"
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}
