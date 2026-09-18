import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Article } from '../core/article.model';
import { articleTranslationKey, categoryTranslationKey } from '../core/translation-keys';
import { buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-article-card',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  template: `
    <article class="article-card">
      <a
        class="article-image"
        [routerLink]="['/articles', article().slug]"
        [attr.aria-label]="
          'ACCESSIBILITY.VIEW_ARTICLE' | translate: { name: nameKey() | translate }
        "
      >
        <img
          [src]="article().images[0]"
          [alt]="'ACCESSIBILITY.ARTICLE_IMAGE' | translate: { name: nameKey() | translate }"
          loading="lazy"
          width="720"
          height="900"
        />
        @if (article().badge) {
          <span class="badge">{{ badgeKey() | translate }}</span>
        }
      </a>
      <div class="article-body">
        <span class="category">{{ categoryKey() | translate }}</span>
        <h3>
          <a [routerLink]="['/articles', article().slug]">{{ nameKey() | translate }}</a>
        </h3>
        <p>{{ shortKey() | translate }}</p>
        <strong class="price">{{
          article().price !== null
            ? (article().price | currency: 'XOF' : 'symbol' : '1.0-0' : 'fr')
            : ('ARTICLES.PRICE_ON_REQUEST' | translate)
        }}</strong>
        <div class="card-actions">
          <a class="btn btn-outline" [routerLink]="['/articles', article().slug]">{{
            'COMMON.LEARN_MORE' | translate
          }}</a
          ><a
            class="btn btn-primary btn-icon"
            [href]="whatsapp"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="
              'ACCESSIBILITY.ORDER_WHATSAPP' | translate: { name: nameKey() | translate }
            "
            >WhatsApp</a
          >
        </div>
      </div>
    </article>
  `,
})
export class ArticleCardComponent {
  private readonly translate = inject(TranslateService);
  readonly article = input.required<Article>();
  readonly nameKey = () => articleTranslationKey(this.article(), 'NAME');
  readonly shortKey = () => articleTranslationKey(this.article(), 'SHORT');
  readonly badgeKey = () => articleTranslationKey(this.article(), 'BADGE');
  readonly categoryKey = () => categoryTranslationKey(this.article().category);
  get whatsapp(): string {
    return buildWhatsAppUrl(
      this.translate.instant('COMMON.WHATSAPP_ARTICLE_MESSAGE', {
        name: this.translate.instant(this.nameKey()),
      }),
    );
  }
}
