import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { LanguageSwitcherComponent } from './language-switcher.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent],
  template: `
    <header class="site-header" [class.scrolled]="scrolled()" [class.menu-open]="menuOpen()">
      <div class="container nav-wrap">
        <a routerLink="/" class="brand" [attr.aria-label]="'ACCESSIBILITY.BRAND_HOME' | translate"
          ><img class="brand-logo" src="/assets/images/zakiya-bio-logo.svg" alt="Zakiya Bio"
        /></a>
        <nav class="desktop-nav" [attr.aria-label]="'ACCESSIBILITY.MAIN_NAV' | translate">
          <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active">{{
            'NAV.HOME' | translate
          }}</a>
          <a routerLink="/articles" routerLinkActive="active">{{ 'NAV.ARTICLES' | translate }}</a>
          <a routerLink="/contact" routerLinkActive="active">{{ 'NAV.CONTACT' | translate }}</a>
        </nav>
        <div class="desktop-language"><app-language-switcher /></div>
        <a routerLink="/articles" class="btn btn-gold desktop-cta">{{
          'NAV.DISCOVER' | translate
        }}</a>
        <button
          class="menu-toggle"
          type="button"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          [attr.aria-label]="'ACCESSIBILITY.TOGGLE_MENU' | translate"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav
        id="mobile-menu"
        class="mobile-nav"
        [class.open]="menuOpen()"
        [attr.aria-label]="'ACCESSIBILITY.MOBILE_NAV' | translate"
      >
        <a
          routerLink="/"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active"
          (click)="closeMenu()"
          >{{ 'NAV.HOME' | translate }}</a
        >
        <a routerLink="/articles" routerLinkActive="active" (click)="closeMenu()">{{
          'NAV.ARTICLES' | translate
        }}</a>
        <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">{{
          'NAV.CONTACT' | translate
        }}</a>
        <div class="mobile-language"><app-language-switcher /></div>
        <a routerLink="/articles" class="btn btn-primary" (click)="closeMenu()">{{
          'NAV.DISCOVER' | translate
        }}</a>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  constructor(router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.closeMenu();
      this.document.defaultView?.scrollTo({ top: 0 });
    });
  }
  @HostListener('window:scroll') onScroll(): void {
    this.scrolled.set((this.document.defaultView?.scrollY ?? 0) > 24);
  }
  @HostListener('document:keydown.escape') onEscape(): void {
    this.closeMenu();
  }
  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }
  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
