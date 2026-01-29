
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Swallow' | 'Rice' | 'Soups' | 'Sides' | 'Drinks';
  popular?: boolean;
  recipeUrl?: string;
  isFeatured?: boolean;
}

export interface CartItem extends Dish {
  quantity: number;
}

export type Category = Dish['category'] | 'All';
