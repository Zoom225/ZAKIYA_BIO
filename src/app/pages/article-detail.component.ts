import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogService } from '../core/catalog.service';
import { articleWhatsAppUrl } from '../core/whatsapp';
import { ArticleCardComponent } from '../shared/article-card.component';

@Component({
  selector: 'app-article-detail', imports: [RouterLink, ArticleCardComponent],
  template: `@if (article(); as item) {
    <section class="detail-page section"><div class="container"><a routerLink="/articles" class="back-link">← Retour aux articles</a><div class="detail-grid"><div class="gallery"><div class="main-photo"><img [src]="selectedImage()" [alt]="item.name + ' - Zakiya Bio'" width="1080" height="1080"></div>@if (item.images.length > 1) {<div class="thumbnails">@for (image of item.images; track image) {<button type="button" (click)="selectedImage.set(image)" [class.active]="selectedImage() === image"><img [src]="image" [alt]="'Autre vue de ' + item.name"></button>}</div>}</div><div class="detail-content"><span class="category">{{ item.category }}</span><h1>{{ item.name }}</h1><p class="lead">{{ item.shortDescription }}</p><p>{{ item.description }}</p><div class="detail-meta">@if (item.sizes.length) {<div><span>Formats</span><strong>{{ item.sizes.join(' • ') }}</strong></div>}@if (item.colors.length) {<div><span>Variantes</span><strong>{{ item.colors.join(' • ') }}</strong></div>}<div><span>Disponibilité</span><strong>{{ item.available ? 'Disponible sur demande' : 'Indisponible' }}</strong></div></div><div class="detail-price">Prix sur demande</div><a class="btn btn-primary btn-wide" [href]="whatsapp" target="_blank" rel="noopener">Commander sur WhatsApp</a><p class="microcopy">Vous serez redirigé vers WhatsApp avec un message déjà préparé.</p></div></div></div></section>
    @if (similar().length) {<section class="section section-tint"><div class="container"><div class="section-title"><span>À découvrir aussi</span><h2>Articles similaires</h2></div><div class="articles-grid articles-grid-small">@for (other of similar(); track other.id) {<app-article-card [article]="other" />}</div></div></section>}
  } @else {<section class="empty-state page-empty"><h1>Article introuvable</h1><p>Cet article n’existe pas ou n’est plus disponible.</p><a routerLink="/articles" class="btn btn-primary">Retour au catalogue</a></section>}`,
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute); private readonly router = inject(Router); private readonly catalog = inject(CatalogService); readonly article = signal(this.catalog.bySlug(this.route.snapshot.paramMap.get('slug'))); readonly selectedImage = signal(this.article()?.images[0] ?? ''); readonly similar = computed(() => this.article() ? this.catalog.similar(this.article()!) : []); get whatsapp(): string { return articleWhatsAppUrl(this.article()?.name ?? ''); }
  constructor() { const item = this.article(); if (item) document.title = `${item.name} | Zakiya Bio`; else this.router.navigateByUrl('/404', { skipLocationChange: true }); }
}
