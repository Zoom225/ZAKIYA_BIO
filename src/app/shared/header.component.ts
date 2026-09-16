import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header" [class.scrolled]="scrolled()" [class.menu-open]="menuOpen()">
      <div class="container nav-wrap">
        <a routerLink="/" class="brand" aria-label="Zakiya Bio, accueil"><img class="brand-logo" src="/assets/images/zakiya-bio-logo.svg" alt="Zakiya Bio"></a>
        <nav class="desktop-nav" aria-label="Navigation principale">
          <a routerLink="/" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active">Accueil</a>
          <a routerLink="/articles" routerLinkActive="active">Articles</a>
          <a routerLink="/contact" routerLinkActive="active">Nous contacter</a>
        </nav>
        <a routerLink="/articles" class="btn btn-gold desktop-cta">Découvrir la sélection</a>
        <button class="menu-toggle" type="button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-controls="mobile-menu" aria-label="Ouvrir ou fermer le menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav id="mobile-menu" class="mobile-nav" [class.open]="menuOpen()" aria-label="Navigation mobile">
        <a routerLink="/" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active" (click)="closeMenu()">Accueil</a>
        <a routerLink="/articles" routerLinkActive="active" (click)="closeMenu()">Articles</a>
        <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Nous contacter</a>
        <a routerLink="/articles" class="btn btn-primary" (click)="closeMenu()">Découvrir la sélection</a>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  constructor(router: Router) { router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => { this.closeMenu(); this.document.defaultView?.scrollTo({ top: 0 }); }); }
  @HostListener('window:scroll') onScroll(): void { this.scrolled.set((this.document.defaultView?.scrollY ?? 0) > 24); }
  @HostListener('document:keydown.escape') onEscape(): void { this.closeMenu(); }
  toggleMenu(): void { this.menuOpen.update(value => !value); }
  closeMenu(): void { this.menuOpen.set(false); }
}
