import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../core/catalog.service';
import { buildWhatsAppUrl } from '../core/whatsapp';
import { ArticleCardComponent } from '../shared/article-card.component';
import { HeroCarouselComponent } from '../shared/hero-carousel.component';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-home', imports: [RouterLink, HeroCarouselComponent, SectionTitleComponent, ArticleCardComponent],
  template: `
    <app-hero-carousel />
    <section class="section welcome"><div class="container split-grid"><div class="image-frame reveal"><img src="/assets/images/products/selection-nigelle.jpg" alt="Sélection de produits naturels Zakiya Bio" loading="lazy" width="1080" height="1920"><span>Une sélection choisie avec attention</span></div><div><app-section-title eyebrow="Notre histoire" title="Bienvenue chez Zakiya Bio" [center]="false" /><p class="lead">Zakiya Bio vous propose une sélection de produits naturels, de soins, de beauté et de saveurs choisis avec attention.</p><p>Notre ambition est de vous accompagner au quotidien avec des références variées, des conseils personnalisés et une commande simple par WhatsApp.</p><div class="signature">Le naturel, simplement.</div><a routerLink="/contact" class="text-link">En savoir plus sur la boutique <span>→</span></a></div></div></section>
    <section class="section section-tint"><div class="container"><app-section-title eyebrow="Explorer" title="Nos univers" description="Des essentiels pour prendre soin de vous et embellir votre quotidien." /><div class="collection-grid">
      @for (collection of collections; track collection.title) {<a routerLink="/articles" [queryParams]="{categorie: collection.category}" class="collection-card"><img [src]="collection.image" [alt]="collection.title" loading="lazy"><div class="collection-overlay"><span>{{ collection.count }}</span><h3>{{ collection.title }}</h3><p>{{ collection.text }}</p><b>Découvrir →</b></div></a>}
    </div></div></section>
    <section class="section"><div class="container"><app-section-title eyebrow="Nos incontournables" title="Articles en vedette" description="Une sélection appréciée à découvrir dès maintenant." /><div class="articles-grid">@for (article of featured; track article.id) {<app-article-card [article]="article" />}</div><div class="center-action"><a routerLink="/articles" class="btn btn-dark">Voir tous les articles</a></div></div></section>
    <section class="section benefits"><div class="container"><app-section-title eyebrow="Pourquoi nous choisir ?" title="L’expérience Zakiya Bio" /><div class="benefit-grid">@for (benefit of benefits; track benefit.title) {<article><span class="benefit-icon">{{ benefit.icon }}</span><h3>{{ benefit.title }}</h3><p>{{ benefit.text }}</p></article>}</div></div></section>
    <section class="section"><div class="container cta-panel"><div><span>Une envie, une question ?</span><h2>Vous avez trouvé votre coup de cœur ?</h2><p>Contactez-nous directement pour connaître les disponibilités et les modalités de commande.</p></div><div class="cta-actions"><a class="btn btn-gold" [href]="whatsapp" target="_blank" rel="noopener">Écrire sur WhatsApp</a><a class="btn btn-ghost" routerLink="/contact">Nous contacter</a></div></div></section>
  `,
})
export class HomeComponent {
  private readonly catalog = inject(CatalogService); readonly featured = this.catalog.articles.filter(a => a.featured).slice(0, 6); readonly whatsapp = buildWhatsAppUrl('Bonjour Zakiya Bio, je souhaite connaître les disponibilités de vos articles.');
  readonly collections = [
    { title: 'Soins naturels', category: 'Soins du corps', count: 'Beauté', text: 'Des rituels choisis pour votre quotidien.', image: '/assets/images/products/huile-fourmi.jpg' },
    { title: 'Bien-être', category: 'Bien-être', count: 'Équilibre', text: 'Une sélection inspirée des traditions naturelles.', image: '/assets/images/products/costus-indien.jpg' },
    { title: 'Saveurs', category: 'Saveurs', count: 'Cuisine', text: 'Des goûts francs pour relever vos recettes.', image: '/assets/images/products/mon-pot-epices.jpg' },
    { title: 'Parfums & huiles', category: 'Parfums', count: 'Rituels', text: 'Des senteurs et huiles à découvrir.', image: '/assets/images/products/parfums-orientica.jpg' },
  ];
  readonly benefits = [
    { icon: '✦', title: 'Sélection soignée', text: 'Des références retenues avec attention pour leur intérêt et leur authenticité.' },
    { icon: '◇', title: 'Variété & qualité', text: 'Beauté, bien-être et saveurs réunis dans une sélection en évolution.' },
    { icon: '♡', title: 'Conseils personnalisés', text: 'Un échange direct pour vous orienter selon vos besoins.' },
    { icon: '↗', title: 'Commande simple', text: 'Une prise de contact rapide et pratique directement sur WhatsApp.' },
  ];
}
