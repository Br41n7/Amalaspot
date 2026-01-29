
import { Dish } from './types';

export const WHATSAPP_NUMBER = "2348000000000"; // Replace with actual number
export const CURRENCY = "₦";

export const CHEFS_SPECIALS: Dish[] = [
  {
    id: 'spec-1',
    name: 'Asun (Spicy Grilled Goat)',
    description: 'Smoky, peppered grilled goat meat prepared with traditional Yorubaland spices and garnished with onions.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    category: 'Sides',
    popular: true
  },
  {
    id: 'spec-2',
    name: 'Abula Supreme Platter',
    description: 'The ultimate Amala experience. A massive serving of Amala, Gbegiri, Ewedu, with 6 varieties of assorted meats and snail.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1628102422044-67f7813a3861?auto=format&fit=crop&q=80&w=800',
    category: 'Swallow',
    popular: true
  },
  {
    id: 'spec-3',
    name: 'Isiewu Traditional',
    description: 'Eastern Nigerian delicacy made with goat head, spicy palm oil sauce, utazi leaves, and traditional spices.',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: 'Sides',
    popular: true
  }
];

export const DISHES: Dish[] = [
  {
    id: '1',
    name: 'Amala & Ewedu Special',
    description: 'Authentic black yam flour (Amala) served with the legendary trifecta: Gbegiri, Ewedu, and rich palm oil stew with assorted meat.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1628102422044-67f7813a3861?auto=format&fit=crop&q=80&w=1200',
    category: 'Swallow',
    popular: true,
    isFeatured: true,
    recipeUrl: 'https://allnigerianrecipes.com/swallow/amala-ewedu-gbegiri/'
  },
  {
    id: '2',
    name: 'Party Jollof Rice',
    description: 'Smoky, firewood-style West African Jollof rice served with perfectly caramelized plantains and succulent grilled chicken.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1604328700070-08ef90be6136?auto=format&fit=crop&q=80&w=1200',
    category: 'Rice',
    popular: true,
    recipeUrl: 'https://www.allrecipes.com/recipe/273338/jollof-rice/'
  },
  {
    id: '3',
    name: 'Eba & Egusi Soup',
    description: 'Yellow cassava flakes (Eba) paired with our signature melon seed soup, slow-cooked with fresh spinach and stockfish.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    category: 'Swallow',
    recipeUrl: 'https://allnigerianrecipes.com/soups/egusi-soup/'
  },
  {
    id: '4',
    name: 'Pounded Yam & Efo Riro',
    description: 'Elastic, hand-pounded yam served with rich, oily vegetable soup (Efo Riro) and a selection of premium assorted proteins.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200',
    category: 'Swallow',
    popular: true,
    recipeUrl: 'https://allnigerianrecipes.com/soups/efo-riro-soup/'
  },
  {
    id: '5',
    name: 'Fufu & Okra Soup',
    description: 'Smooth fermented cassava (Fufu) served with a drawy, spicy okra soup loaded with fresh fish and cow skin (Ponmo).',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200',
    category: 'Swallow',
    recipeUrl: 'https://allnigerianrecipes.com/soups/okra-soup/'
  },
  {
    id: '6',
    name: 'Coconut Rice Deluxe',
    description: 'Creamy rice infused with fresh coconut milk, garnished with vibrant vegetables and seasoned jumbo shrimps.',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=1200',
    category: 'Rice'
  },
  {
    id: '7',
    name: 'Fried Plantain (Dodo)',
    description: 'The world\'s best side dish. Ripe plantains sliced and fried until they reach sweet, golden-brown perfection.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1621539148497-6a5676a6bc7c?auto=format&fit=crop&q=80&w=800',
    category: 'Sides'
  },
  {
    id: '8',
    name: 'Moin Moin',
    description: 'Savory steamed bean pudding crafted from pureed black-eyed peas, peppers, and enriched with eggs or fish.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    category: 'Sides'
  },
  {
    id: '9',
    name: 'Fresh Palm Wine',
    description: 'Authentic, naturally tapped sweet palm wine. Chilled and served with a refreshing tropical zest.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&q=80&w=800',
    category: 'Drinks'
  }
];
