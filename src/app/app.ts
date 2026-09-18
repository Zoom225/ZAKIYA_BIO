import { DestroyRef, Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { CatalogService } from './core/catalog.service';
import { LanguageService } from './core/language.service';
import { articleTranslationKey } from './core/translation-keys';
import { FooterComponent } from './shared/footer.component';
import { FloatingActionsComponent } from './shared/floating-actions.component';
import { HeaderComponent } from './shared/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    FloatingActionsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);
  private readonly catalog = inject(CatalogService);
  private readonly currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
    effect(() => {
      this.language.activeLanguage();
      const path = this.currentUrl().split('?')[0];
      let key = 'SEO.NOT_FOUND';
      if (path === '/') key = 'SEO.HOME';
      else if (path === '/articles') key = 'SEO.ARTICLES';
      else if (path === '/contact') key = 'SEO.CONTACT';
      else if (path.startsWith('/articles/')) {
        const article = this.catalog.bySlug(path.split('/')[2]);
        if (article) {
          this.title.setTitle(
            `${this.translate.instant(articleTranslationKey(article, 'NAME'))} | Zakiya Bio`,
          );
          return;
        }
      }
      this.title.setTitle(this.translate.instant(key));
    });
  }
}
