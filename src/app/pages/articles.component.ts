import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../core/catalog.service';
import { ArticleCardComponent } from '../shared/article-card.component';

@Component({
  selector: 'app-articles', imports: [FormsModule, ArticleCardComponent],
  template: `
    <section class="page-hero"><div class="container"><span>La boutique</span><h1>Nos articles</h1><p>Explorez notre sélection de produits naturels, de soins, de beauté et de saveurs.</p></div></section>
    <section class="section catalog"><div class="container"><div class="filters" role="search"><label class="search-field"><span>Rechercher un article</span><input type="search" [ngModel]="query()" (ngModelChange)="query.set($event)" placeholder="Ex. huile, épices, savon…"></label><label><span>Catégorie</span><select [ngModel]="category()" (ngModelChange)="category.set($event)"><option value="">Toutes les catégories</option>@for (item of catalog.categories; track item) {<option [value]="item">{{ item }}</option>}</select></label><button class="btn btn-outline reset" type="button" (click)="reset()">Réinitialiser</button></div>
      <div class="results-head"><p><strong>{{ filtered().length }}</strong> article{{ filtered().length > 1 ? 's' : '' }} affiché{{ filtered().length > 1 ? 's' : '' }}</p></div>
      @if (filtered().length) {<div class="articles-grid">@for (article of filtered(); track article.id) {<app-article-card [article]="article" />}</div>} @else {<div class="empty-state"><span>⌕</span><h2>Aucun article trouvé</h2><p>Essayez un autre mot-clé ou réinitialisez les filtres.</p><button class="btn btn-primary" type="button" (click)="reset()">Voir tous les articles</button></div>}
    </div></section>
  `,
})
export class ArticlesComponent {
  readonly catalog = inject(CatalogService); private readonly route = inject(ActivatedRoute); readonly query = signal(''); readonly category = signal(this.route.snapshot.queryParamMap.get('categorie') ?? ''); readonly filtered = computed(() => this.catalog.filter(this.query(), this.category()));
  reset(): void { this.query.set(''); this.category.set(''); }
}
