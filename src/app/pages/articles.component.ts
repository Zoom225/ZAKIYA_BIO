import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CatalogService } from '../core/catalog.service';
import { LanguageService } from '../core/language.service';
import { categoryTranslationKey } from '../core/translation-keys';
import { ArticleCardComponent } from '../shared/article-card.component';

@Component({
  selector: 'app-articles',
  imports: [FormsModule, TranslatePipe, ArticleCardComponent],
  template: `
    <section class="page-hero">
      <div class="container">
        <span>{{ 'ARTICLES.HERO.EYEBROW' | translate }}</span>
        <h1>{{ 'ARTICLES.HERO.TITLE' | translate }}</h1>
        <p>{{ 'ARTICLES.HERO.TEXT' | translate }}</p>
      </div>
    </section>
    <section class="section catalog">
      <div class="container">
        <div class="filters" role="search">
          <label class="search-field"
            ><span>{{ 'ARTICLES.FILTERS.SEARCH_LABEL' | translate }}</span
            ><input
              type="search"
              [ngModel]="query()"
              (ngModelChange)="query.set($event)"
              [placeholder]="'ARTICLES.FILTERS.SEARCH_PLACEHOLDER' | translate" /></label
          ><label
            ><span>{{ 'ARTICLES.FILTERS.CATEGORY' | translate }}</span
            ><select [ngModel]="category()" (ngModelChange)="category.set($event)">
              <option value="">{{ 'ARTICLES.FILTERS.ALL_CATEGORIES' | translate }}</option>
              @for (item of catalog.categories; track item) {
                <option [value]="item">{{ categoryKey(item) | translate }}</option>
              }
            </select></label
          ><button class="btn btn-outline reset" type="button" (click)="reset()">
            {{ 'COMMON.RESET' | translate }}
          </button>
        </div>
        <div class="results-head">
          <p>{{ 'ARTICLES.RESULTS' | translate: { count: filtered().length } }}</p>
        </div>
        @if (filtered().length) {
          <div class="articles-grid">
            @for (article of filtered(); track article.id) {
              <app-article-card [article]="article" />
            }
          </div>
        } @else {
          <div class="empty-state">
            <span>⌕</span>
            <h2>{{ 'ARTICLES.EMPTY.TITLE' | translate }}</h2>
            <p>{{ 'ARTICLES.EMPTY.TEXT' | translate }}</p>
            <button class="btn btn-primary" type="button" (click)="reset()">
              {{ 'ARTICLES.EMPTY.ACTION' | translate }}
            </button>
          </div>
        }
      </div>
    </section>
  `,
})
export class ArticlesComponent {
  readonly catalog = inject(CatalogService);
  private readonly route = inject(ActivatedRoute);
  private readonly language = inject(LanguageService);
  readonly query = signal('');
  readonly category = signal(this.route.snapshot.queryParamMap.get('categorie') ?? '');
  readonly filtered = computed(() => {
    this.language.activeLanguage();
    return this.catalog.filter(this.query(), this.category());
  });
  readonly categoryKey = categoryTranslationKey;
  reset(): void {
    this.query.set('');
    this.category.set('');
  }
}
