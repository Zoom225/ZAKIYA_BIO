import { Article } from './article.model';

export type ArticleTranslationField = 'NAME' | 'SHORT' | 'DESCRIPTION' | 'BADGE';

export function articleTranslationKey(article: Article, field: ArticleTranslationField): string {
  return `ARTICLES.ITEMS.${article.slug}.${field}`;
}

export function categoryTranslationKey(category: string): string {
  const keys: Record<string, string> = {
    Saveurs: 'FLAVORS',
    'Soins du corps': 'BODY_CARE',
    Savons: 'SOAPS',
    'Soins capillaires': 'HAIR_CARE',
    'Bien-être': 'WELLNESS',
    Parfums: 'PERFUMES',
    'Huiles naturelles': 'NATURAL_OILS',
  };
  return `ARTICLES.CATEGORIES.${keys[category] ?? 'OTHER'}`;
}
