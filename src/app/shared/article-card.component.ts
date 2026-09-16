import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../core/article.model';
import { articleWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-article-card', imports: [RouterLink, CurrencyPipe],
  template: `
    <article class="article-card">
      <a class="article-image" [routerLink]="['/articles', article().slug]" [attr.aria-label]="'Voir ' + article().name">
        <img [src]="article().images[0]" [alt]="article().name + ' proposé par Zakiya Bio'" loading="lazy" width="720" height="900">
        @if (article().badge) {<span class="badge">{{ article().badge }}</span>}
      </a>
      <div class="article-body"><span class="category">{{ article().category }}</span><h3><a [routerLink]="['/articles', article().slug]">{{ article().name }}</a></h3><p>{{ article().shortDescription }}</p>
        <strong class="price">{{ article().price !== null ? (article().price | currency:'XOF':'symbol':'1.0-0':'fr') : 'Prix sur demande' }}</strong>
        <div class="card-actions"><a class="btn btn-outline" [routerLink]="['/articles', article().slug]">En savoir plus</a><a class="btn btn-primary btn-icon" [href]="whatsapp" target="_blank" rel="noopener" [attr.aria-label]="'Commander ' + article().name + ' sur WhatsApp'">WhatsApp</a></div>
      </div>
    </article>
  `,
})
export class ArticleCardComponent { readonly article = input.required<Article>(); get whatsapp(): string { return articleWhatsAppUrl(this.article().name); } }
