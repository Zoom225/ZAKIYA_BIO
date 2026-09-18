import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CatalogService } from '../core/catalog.service';
import { articleTranslationKey, categoryTranslationKey } from '../core/translation-keys';
import { buildWhatsAppUrl } from '../core/whatsapp';
import { ArticleCardComponent } from '../shared/article-card.component';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink, TranslatePipe, ArticleCardComponent],
  template: `@if (article(); as item) {
      <section class="detail-page section">
        <div class="container">
          <a routerLink="/articles" class="back-link"
            ><span class="directional-icon">←</span> {{ 'ARTICLES.DETAIL.BACK' | translate }}</a
          >
          <div class="detail-grid">
            <div class="gallery">
              <div class="main-photo">
                <img
                  [src]="selectedImage()"
                  [alt]="'ACCESSIBILITY.ARTICLE_IMAGE' | translate: { name: nameKey() | translate }"
                  width="1080"
                  height="1080"
                />
              </div>
              @if (item.images.length > 1) {
                <div class="thumbnails">
                  @for (image of item.images; track image) {
                    <button
                      type="button"
                      (click)="selectedImage.set(image)"
                      [class.active]="selectedImage() === image"
                    >
                      <img
                        [src]="image"
                        [alt]="
                          'ACCESSIBILITY.OTHER_VIEW' | translate: { name: nameKey() | translate }
                        "
                      />
                    </button>
                  }
                </div>
              }
            </div>
            <div class="detail-content">
              <span class="category">{{ categoryKey() | translate }}</span>
              <h1>{{ nameKey() | translate }}</h1>
              <p class="lead">{{ shortKey() | translate }}</p>
              <p>{{ descriptionKey() | translate }}</p>
              <div class="detail-meta">
                @if (item.sizes.length) {
                  <div>
                    <span>{{ 'ARTICLES.DETAIL.SIZES' | translate }}</span
                    ><strong>{{ item.sizes.join(' • ') }}</strong>
                  </div>
                }
                @if (item.colors.length) {
                  <div>
                    <span>{{ 'ARTICLES.DETAIL.VARIANTS' | translate }}</span
                    ><strong>{{ 'ARTICLES.DETAIL.VARIED' | translate }}</strong>
                  </div>
                }
                <div>
                  <span>{{ 'ARTICLES.DETAIL.AVAILABILITY' | translate }}</span
                  ><strong>{{
                    (item.available ? 'ARTICLES.DETAIL.AVAILABLE' : 'ARTICLES.DETAIL.UNAVAILABLE')
                      | translate
                  }}</strong>
                </div>
              </div>
              <div class="detail-price">{{ 'ARTICLES.PRICE_ON_REQUEST' | translate }}</div>
              <a
                class="btn btn-primary btn-wide"
                [href]="whatsapp"
                target="_blank"
                rel="noopener"
                >{{ 'ARTICLES.DETAIL.ORDER' | translate }}</a
              >
              <p class="microcopy">{{ 'ARTICLES.DETAIL.WHATSAPP_NOTE' | translate }}</p>
            </div>
          </div>
        </div>
      </section>
      @if (similar().length) {
        <section class="section section-tint">
          <div class="container">
            <div class="section-title">
              <span>{{ 'ARTICLES.DETAIL.SIMILAR_EYEBROW' | translate }}</span>
              <h2>{{ 'ARTICLES.DETAIL.SIMILAR_TITLE' | translate }}</h2>
            </div>
            <div class="articles-grid articles-grid-small">
              @for (other of similar(); track other.id) {
                <app-article-card [article]="other" />
              }
            </div>
          </div>
        </section>
      }
    } @else {
      <section class="empty-state page-empty">
        <h1>{{ 'ARTICLES.DETAIL.NOT_FOUND_TITLE' | translate }}</h1>
        <p>{{ 'ARTICLES.DETAIL.NOT_FOUND_TEXT' | translate }}</p>
        <a routerLink="/articles" class="btn btn-primary">{{
          'ARTICLES.DETAIL.BACK_CATALOG' | translate
        }}</a>
      </section>
    }`,
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalog = inject(CatalogService);
  private readonly translate = inject(TranslateService);
  readonly article = signal(this.catalog.bySlug(this.route.snapshot.paramMap.get('slug')));
  readonly selectedImage = signal(this.article()?.images[0] ?? '');
  readonly similar = computed(() => (this.article() ? this.catalog.similar(this.article()!) : []));
  readonly nameKey = () => (this.article() ? articleTranslationKey(this.article()!, 'NAME') : '');
  readonly shortKey = () => (this.article() ? articleTranslationKey(this.article()!, 'SHORT') : '');
  readonly descriptionKey = () =>
    this.article() ? articleTranslationKey(this.article()!, 'DESCRIPTION') : '';
  readonly categoryKey = () =>
    this.article() ? categoryTranslationKey(this.article()!.category) : '';
  get whatsapp(): string {
    return buildWhatsAppUrl(
      this.translate.instant('COMMON.WHATSAPP_ARTICLE_MESSAGE', {
        name: this.translate.instant(this.nameKey()),
      }),
    );
  }
  constructor() {
    if (!this.article()) this.router.navigateByUrl('/404', { skipLocationChange: true });
  }
}
