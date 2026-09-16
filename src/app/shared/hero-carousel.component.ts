import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-carousel', imports: [RouterLink],
  template: `
    <section class="hero" aria-roledescription="carousel" aria-label="Sélection Zakiya Bio" (mouseenter)="pause()" (mouseleave)="resume()" (touchstart)="touchStart($event)" (touchend)="touchEnd($event)">
      @for (slide of slides; track slide.image; let i = $index) {
        <div class="hero-slide" [class.active]="current() === i" [attr.aria-hidden]="current() !== i"><img [src]="slide.image" [alt]="slide.alt" [attr.loading]="i === 0 ? 'eager' : 'lazy'" width="1280" height="960"><div class="hero-overlay"></div></div>
      }
      <div class="container hero-content"><span class="hero-kicker">Beauté • Bien-être • Saveurs</span><h1>{{ slides[current()].title }}</h1><p>{{ slides[current()].text }}</p><div class="hero-actions"><a routerLink="/articles" class="btn btn-gold">Découvrir nos articles</a><a routerLink="/contact" class="btn btn-ghost">Nous contacter</a></div></div>
      <button type="button" class="carousel-arrow prev" (click)="previous(true)" aria-label="Diapositive précédente">‹</button><button type="button" class="carousel-arrow next" (click)="next(true)" aria-label="Diapositive suivante">›</button>
      <div class="carousel-dots">@for (slide of slides; track slide.image; let i = $index) {<button type="button" (click)="goTo(i)" [class.active]="current() === i" [attr.aria-label]="'Afficher la diapositive ' + (i + 1)" [attr.aria-current]="current() === i ? 'true' : null"></button>}</div>
    </section>
  `,
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  readonly slides = [
    { image: '/assets/images/hero/hero-epices.jpg', alt: "Pot d'épices Zakiya Bio entouré d'ingrédients", title: 'Le naturel qui vous ressemble', text: 'Découvrez une sélection attentive de soins, de saveurs et de produits bien-être pour votre quotidien.' },
    { image: '/assets/images/hero/hero-parfums.jpg', alt: 'Collection de parfums Orientica', title: 'Des essentiels choisis avec soin', text: 'Des produits authentiques et variés, réunis pour prendre soin de vous et de ceux que vous aimez.' },
    { image: '/assets/images/hero/hero-soin.jpg', alt: 'Sélection de soins naturels Zakiya Bio', title: 'Votre bien-être, notre inspiration', text: 'Beauté, rituels naturels et conseils personnalisés : trouvez le produit adapté à vos envies.' },
  ];
  readonly current = signal(0); private timer?: ReturnType<typeof setInterval>; private startX = 0;
  ngOnInit(): void { this.resume(); } ngOnDestroy(): void { this.pause(); }
  next(interacted = false): void { this.current.update(i => (i + 1) % this.slides.length); if (interacted) this.restart(); }
  previous(interacted = false): void { this.current.update(i => (i - 1 + this.slides.length) % this.slides.length); if (interacted) this.restart(); }
  goTo(i: number): void { this.current.set(i); this.restart(); }
  pause(): void { if (this.timer) clearInterval(this.timer); }
  resume(): void { this.pause(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) this.timer = setInterval(() => this.next(), 6000); }
  restart(): void { this.pause(); setTimeout(() => this.resume(), 8000); }
  touchStart(event: TouchEvent): void { this.startX = event.changedTouches[0].clientX; this.pause(); }
  touchEnd(event: TouchEvent): void { const delta = event.changedTouches[0].clientX - this.startX; if (Math.abs(delta) > 45) delta > 0 ? this.previous() : this.next(); this.restart(); }
}
