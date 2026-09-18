import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent) },
  {
    path: 'articles',
    loadComponent: () => import('./pages/articles.component').then((m) => m.ArticlesComponent),
  },
  {
    path: 'articles/:slug',
    loadComponent: () =>
      import('./pages/article-detail.component').then((m) => m.ArticleDetailComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.component').then((m) => m.NotFoundComponent),
  },
];
