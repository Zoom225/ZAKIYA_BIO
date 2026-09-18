import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CatalogService } from '../core/catalog.service';
import { buildWhatsAppUrl } from '../core/whatsapp';
import { ArticleCardComponent } from '../shared/article-card.component';
import { HeroCarouselComponent } from '../shared/hero-carousel.component';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TranslatePipe,
    HeroCarouselComponent,
    SectionTitleComponent,
    ArticleCardComponent,
  ],
  template: `
    <app-hero-carousel />
    <section class="section welcome">
      <div class="container split-grid">
        <div class="image-frame reveal">
          <img
            src="/assets/images/products/selection-nigelle.jpg"
            [alt]="'HOME.WELCOME.IMAGE_ALT' | translate"
            loading="lazy"
            width="1080"
            height="1920"
          /><span>{{ 'HOME.WELCOME.IMAGE_CAPTION' | translate }}</span>
        </div>
        <div>
          <app-section-title
            eyebrow="HOME.WELCOME.EYEBROW"
            title="HOME.WELCOME.TITLE"
            [center]="false"
          />
          <p class="lead">{{ 'HOME.WELCOME.LEAD' | translate }}</p>
          <p>{{ 'HOME.WELCOME.TEXT' | translate }}</p>
          <div class="signature">{{ 'HOME.WELCOME.SIGNATURE' | translate }}</div>
          <a routerLink="/contact" class="text-link"
            >{{ 'HOME.WELCOME.LINK' | translate }} <span class="directional-icon">→</span></a
          >
        </div>
      </div>
    </section>
    <section class="section section-tint">
      <div class="container">
        <app-section-title
          eyebrow="HOME.COLLECTIONS.EYEBROW"
          title="HOME.COLLECTIONS.TITLE"
          description="HOME.COLLECTIONS.DESCRIPTION"
        />
        <div class="collection-grid">
          @for (collection of collections; track collection.key) {
            <a
              routerLink="/articles"
              [queryParams]="{ categorie: collection.category }"
              class="collection-card"
              ><img
                [src]="collection.image"
                [alt]="collectionKey(collection.key, 'TITLE') | translate"
                loading="lazy"
              />
              <div class="collection-overlay">
                <span>{{ collectionKey(collection.key, 'COUNT') | translate }}</span>
                <h3>{{ collectionKey(collection.key, 'TITLE') | translate }}</h3>
                <p>{{ collectionKey(collection.key, 'TEXT') | translate }}</p>
                <b>{{ 'COMMON.DISCOVER' | translate }} <span class="directional-icon">→</span></b>
              </div></a
            >
          }
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <app-section-title
          eyebrow="HOME.FEATURED.EYEBROW"
          title="HOME.FEATURED.TITLE"
          description="HOME.FEATURED.DESCRIPTION"
        />
        <div class="articles-grid">
          @for (article of featured; track article.id) {
            <app-article-card [article]="article" />
          }
        </div>
        <div class="center-action">
          <a routerLink="/articles" class="btn btn-dark">{{ 'HOME.FEATURED.ALL' | translate }}</a>
        </div>
      </div>
    </section>
    <section class="section benefits">
      <div class="container">
        <app-section-title eyebrow="HOME.BENEFITS.EYEBROW" title="HOME.BENEFITS.TITLE" />
        <div class="benefit-grid">
          @for (benefit of benefits; track benefit.key) {
            <article>
              <span class="benefit-icon">{{ benefit.icon }}</span>
              <h3>{{ benefitKey(benefit.key, 'TITLE') | translate }}</h3>
              <p>{{ benefitKey(benefit.key, 'TEXT') | translate }}</p>
            </article>
          }
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container cta-panel">
        <div>
          <span>{{ 'HOME.CTA.EYEBROW' | translate }}</span>
          <h2>{{ 'HOME.CTA.TITLE' | translate }}</h2>
          <p>{{ 'HOME.CTA.TEXT' | translate }}</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-gold" [href]="whatsapp" target="_blank" rel="noopener">{{
            'COMMON.WRITE_WHATSAPP' | translate
          }}</a
          ><a class="btn btn-ghost" routerLink="/contact">{{ 'NAV.CONTACT' | translate }}</a>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  private readonly catalog = inject(CatalogService);
  private readonly translate = inject(TranslateService);
  readonly featured = this.catalog.articles.filter((a) => a.featured).slice(0, 6);
  get whatsapp(): string {
    return buildWhatsAppUrl(this.translate.instant('COMMON.WHATSAPP_AVAILABILITY_MESSAGE'));
  }
  readonly collections = [
    { key: 'CARE', category: 'Soins du corps', image: '/assets/images/products/huile-fourmi.jpg' },
    { key: 'WELLNESS', category: 'Bien-être', image: '/assets/images/products/costus-indien.jpg' },
    { key: 'FLAVORS', category: 'Saveurs', image: '/assets/images/products/mon-pot-epices.jpg' },
    {
      key: 'PERFUMES',
      category: 'Parfums',
      image: '/assets/images/products/parfums-orientica.jpg',
    },
  ];
  readonly benefits = [
    { key: 'CURATED', icon: '✦' },
    { key: 'QUALITY', icon: '◇' },
    { key: 'ADVICE', icon: '♡' },
    { key: 'ORDER', icon: '↗' },
  ];
  collectionKey(key: string, field: string): string {
    return `HOME.COLLECTIONS.ITEMS.${key}.${field}`;
  }
  benefitKey(key: string, field: string): string {
    return `HOME.BENEFITS.ITEMS.${key}.${field}`;
  }
}
