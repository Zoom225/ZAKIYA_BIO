import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-not-found', imports: [RouterLink], template: `<section class="not-found"><div><span>404</span><h1>Cette page s’est égarée</h1><p>La page que vous cherchez n’existe pas ou a été déplacée.</p><div><a routerLink="/" class="btn btn-primary">Retour à l’accueil</a><a routerLink="/articles" class="btn btn-outline">Voir les articles</a></div></div></section>` })
export class NotFoundComponent {}
