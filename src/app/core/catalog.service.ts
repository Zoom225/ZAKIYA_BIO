import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Article } from './article.model';
import { ARTICLES } from './articles.data';
import { articleTranslationKey } from './translation-keys';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(@Optional() private readonly translate: TranslateService | null = null) {}
  readonly articles = ARTICLES;
  readonly categories = [...new Set(ARTICLES.map((article) => article.category))].sort();

  bySlug(slug: string | null): Article | undefined {
    return ARTICLES.find((article) => article.slug === slug);
  }
  similar(article: Article): Article[] {
    return ARTICLES.filter(
      (item) => item.category === article.category && item.id !== article.id,
    ).slice(0, 3);
  }
  filter(query: string, category: string): Article[] {
    const language = this.translate?.getCurrentLang() || 'fr';
    const term = query.trim().toLocaleLowerCase(language);
    return ARTICLES.filter((article) => {
      const translated = this.translate
        ? `${this.translate.instant(articleTranslationKey(article, 'NAME'))} ${this.translate.instant(articleTranslationKey(article, 'SHORT'))}`
        : '';
      const searchable = `${translated} ${article.name} ${article.shortDescription}`;
      return (
        (!category || article.category === category) &&
        (!term || searchable.toLocaleLowerCase(language).includes(term))
      );
    });
  }
}
