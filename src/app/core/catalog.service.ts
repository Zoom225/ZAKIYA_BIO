import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { ARTICLES } from './articles.data';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly articles = ARTICLES;
  readonly categories = [...new Set(ARTICLES.map(article => article.category))].sort();

  bySlug(slug: string | null): Article | undefined { return ARTICLES.find(article => article.slug === slug); }
  similar(article: Article): Article[] { return ARTICLES.filter(item => item.category === article.category && item.id !== article.id).slice(0, 3); }
  filter(query: string, category: string): Article[] {
    const term = query.trim().toLocaleLowerCase('fr');
    return ARTICLES.filter(article => (!category || article.category === category) && (!term || `${article.name} ${article.shortDescription}`.toLocaleLowerCase('fr').includes(term)));
  }
}
