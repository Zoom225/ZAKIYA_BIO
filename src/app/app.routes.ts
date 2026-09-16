import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Zakiya Bio | Le naturel au service de votre bien-être', loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent) },
  { path: 'articles', title: 'Nos articles | Zakiya Bio', loadComponent: () => import('./pages/articles.component').then(m => m.ArticlesComponent) },
  { path: 'articles/:slug', loadComponent: () => import('./pages/article-detail.component').then(m => m.ArticleDetailComponent) },
  { path: 'contact', title: 'Contactez-nous | Zakiya Bio', loadComponent: () => import('./pages/contact.component').then(m => m.ContactComponent) },
  { path: '**', title: 'Page introuvable | Zakiya Bio', loadComponent: () => import('./pages/not-found.component').then(m => m.NotFoundComponent) },
];
