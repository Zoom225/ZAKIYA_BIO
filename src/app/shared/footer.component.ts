import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../core/site.config';

@Component({
  selector: 'app-footer', imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div><a routerLink="/" class="brand brand-light" aria-label="Zakiya Bio, accueil"><img class="brand-logo footer-logo" src="/assets/images/zakiya-bio-logo.svg" alt="Zakiya Bio"></a><p>{{ config.description }}</p></div>
        <div><h2>Navigation</h2><a routerLink="/">Accueil</a><a routerLink="/articles">Nos articles</a><a routerLink="/contact">Nous contacter</a></div>
        <div><h2>Nous joindre</h2><a [href]="whatsappUrl" target="_blank" rel="noopener">WhatsApp : {{ config.whatsapp }}</a><a [href]="whatsappSecondaryUrl" target="_blank" rel="noopener">WhatsApp : {{ config.whatsappSecondary }}</a><a [href]="config.facebookUrl" target="_blank" rel="noopener">Suivre Zakiya Bio sur Facebook</a><p>{{ config.address }}</p></div>
        <div><h2>La lettre naturelle</h2><p>Nos nouveautés seront bientôt disponibles par e-mail.</p><span class="coming-soon">Inscription bientôt disponible</span></div>
      </div>
      <div class="container footer-bottom"><span>© {{ year }} Zakiya Bio. Tous droits réservés.</span><span>Conçu avec soin pour votre bien-être.</span></div>
    </footer>
  `,
})
export class FooterComponent { readonly config = SITE_CONFIG; readonly year = new Date().getFullYear(); readonly whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappDigits}`; readonly whatsappSecondaryUrl = `https://wa.me/${SITE_CONFIG.whatsappSecondaryDigits}`; }
