export interface Article {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  images: string[];
  price: number | null;
  priceOnRequest: boolean;
  sizes: string[];
  colors: string[];
  featured: boolean;
  badge?: 'Nouveau' | 'Tendance' | 'Coup de cœur';
  available: boolean;
}
