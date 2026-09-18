import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../core/site.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a
            routerLink="/"
            class="brand brand-light"
            [attr.aria-label]="'ACCESSIBILITY.BRAND_HOME' | translate"
            ><img
              class="brand-logo footer-logo"
              src="/assets/images/zakiya-bio-logo.svg"
              alt="Zakiya Bio"
          /></a>
          <p>{{ 'FOOTER.DESCRIPTION' | translate }}</p>
        </div>
        <div>
          <h2>{{ 'FOOTER.NAVIGATION' | translate }}</h2>
          <a routerLink="/">{{ 'NAV.HOME' | translate }}</a
          ><a routerLink="/articles">{{ 'FOOTER.OUR_ARTICLES' | translate }}</a
          ><a routerLink="/contact">{{ 'NAV.CONTACT' | translate }}</a>
        </div>
        <div>
          <h2>{{ 'FOOTER.CONTACT_US' | translate }}</h2>
          <a [href]="whatsappUrl" target="_blank" rel="noopener">WhatsApp : {{ config.whatsapp }}</a
          ><a [href]="whatsappSecondaryUrl" target="_blank" rel="noopener"
            >WhatsApp : {{ config.whatsappSecondary }}</a
          ><a [href]="config.facebookUrl" target="_blank" rel="noopener">{{
            'FOOTER.FACEBOOK' | translate
          }}</a>
          <p>{{ config.address }}</p>
        </div>
        <div>
          <h2>{{ 'FOOTER.NEWSLETTER_TITLE' | translate }}</h2>
          <p>{{ 'FOOTER.NEWSLETTER_TEXT' | translate }}</p>
          <span class="coming-soon">{{ 'FOOTER.COMING_SOON' | translate }}</span>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>{{ 'FOOTER.COPYRIGHT' | translate: { year: year } }}</span
        ><span>{{ 'FOOTER.CARE' | translate }}</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly config = SITE_CONFIG;
  readonly year = new Date().getFullYear();
  readonly whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappDigits}`;
  readonly whatsappSecondaryUrl = `https://wa.me/${SITE_CONFIG.whatsappSecondaryDigits}`;
}
