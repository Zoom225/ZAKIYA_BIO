import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-carousel',
  imports: [RouterLink, TranslatePipe],
  template: `
    <section
      class="hero"
      aria-roledescription="carousel"
      [attr.aria-label]="'ACCESSIBILITY.HERO_CAROUSEL' | translate"
      (mouseenter)="pause()"
      (mouseleave)="resume()"
      (touchstart)="touchStart($event)"
      (touchend)="touchEnd($event)"
    >
      @for (slide of slides; track slide.image; let i = $index) {
        <div
          class="hero-slide"
          [class.active]="current() === i"
          [attr.aria-hidden]="current() !== i"
        >
          <img
            [src]="slide.image"
            [alt]="slide.alt | translate"
            [attr.loading]="i === 0 ? 'eager' : 'lazy'"
            width="1280"
            height="960"
          />
          <div class="hero-overlay"></div>
        </div>
      }
      <div class="container hero-content">
        <span class="hero-kicker">{{ 'HOME.HERO.KICKER' | translate }}</span>
        <h1>{{ slides[current()].title | translate }}</h1>
        <p>{{ slides[current()].text | translate }}</p>
        <div class="hero-actions">
          <a routerLink="/articles" class="btn btn-gold">{{
            'HOME.HERO.ARTICLES_CTA' | translate
          }}</a
          ><a routerLink="/contact" class="btn btn-ghost">{{ 'NAV.CONTACT' | translate }}</a>
        </div>
      </div>
      <button
        type="button"
        class="carousel-arrow prev"
        (click)="previous(true)"
        [attr.aria-label]="'ACCESSIBILITY.PREVIOUS_SLIDE' | translate"
      >
        ‹</button
      ><button
        type="button"
        class="carousel-arrow next"
        (click)="next(true)"
        [attr.aria-label]="'ACCESSIBILITY.NEXT_SLIDE' | translate"
      >
        ›
      </button>
      <div class="carousel-dots">
        @for (slide of slides; track slide.image; let i = $index) {
          <button
            type="button"
            (click)="goTo(i)"
            [class.active]="current() === i"
            [attr.aria-label]="'ACCESSIBILITY.SHOW_SLIDE' | translate: { number: i + 1 }"
            [attr.aria-current]="current() === i ? 'true' : null"
          ></button>
        }
      </div>
    </section>
  `,
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  readonly slides = [
    {
      image: '/assets/images/hero/hero-epices.jpg',
      alt: 'HOME.HERO.SLIDES.SPICES.ALT',
      title: 'HOME.HERO.SLIDES.SPICES.TITLE',
      text: 'HOME.HERO.SLIDES.SPICES.TEXT',
    },
    {
      image: '/assets/images/hero/hero-parfums.jpg',
      alt: 'HOME.HERO.SLIDES.PERFUMES.ALT',
      title: 'HOME.HERO.SLIDES.PERFUMES.TITLE',
      text: 'HOME.HERO.SLIDES.PERFUMES.TEXT',
    },
    {
      image: '/assets/images/hero/hero-soin.jpg',
      alt: 'HOME.HERO.SLIDES.CARE.ALT',
      title: 'HOME.HERO.SLIDES.CARE.TITLE',
      text: 'HOME.HERO.SLIDES.CARE.TEXT',
    },
  ];
  readonly current = signal(0);
  private timer?: ReturnType<typeof setInterval>;
  private startX = 0;
  ngOnInit(): void {
    this.resume();
  }
  ngOnDestroy(): void {
    this.pause();
  }
  next(interacted = false): void {
    this.current.update((i) => (i + 1) % this.slides.length);
    if (interacted) this.restart();
  }
  previous(interacted = false): void {
    this.current.update((i) => (i - 1 + this.slides.length) % this.slides.length);
    if (interacted) this.restart();
  }
  goTo(i: number): void {
    this.current.set(i);
    this.restart();
  }
  pause(): void {
    if (this.timer) clearInterval(this.timer);
  }
  resume(): void {
    this.pause();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      this.timer = setInterval(() => this.next(), 6000);
  }
  restart(): void {
    this.pause();
    setTimeout(() => this.resume(), 8000);
  }
  touchStart(event: TouchEvent): void {
    this.startX = event.changedTouches[0].clientX;
    this.pause();
  }
  touchEnd(event: TouchEvent): void {
    const delta = event.changedTouches[0].clientX - this.startX;
    if (Math.abs(delta) > 45) delta > 0 ? this.previous() : this.next();
    this.restart();
  }
}
