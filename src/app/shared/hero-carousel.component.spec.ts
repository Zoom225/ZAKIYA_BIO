import { HeroCarouselComponent } from './hero-carousel.component';

describe('HeroCarouselComponent', () => {
  it('moves forward and loops between slides', () => {
    const carousel = new HeroCarouselComponent();
    expect(carousel.current()).toBe(0);
    carousel.next();
    expect(carousel.current()).toBe(1);
    carousel.goTo(carousel.slides.length - 1);
    carousel.next();
    expect(carousel.current()).toBe(0);
    carousel.ngOnDestroy();
  });
});
