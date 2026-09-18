import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { LanguageCode, LanguageService } from '../core/language.service';

@Component({
  selector: 'app-language-switcher',
  host: { class: 'language-switcher' },
  template: `
    <button
      class="language-trigger"
      type="button"
      aria-haspopup="listbox"
      [attr.aria-expanded]="open()"
      [attr.aria-label]="active().selectorAriaLabel"
      (click)="toggle()"
    >
      <img
        class="language-flag"
        [src]="active().flagSrc"
        [alt]="active().flagAlt"
        width="28"
        height="21"
      />
      <span class="language-label">{{ active().label }}</span>
      <span class="language-chevron" [class.open]="open()" aria-hidden="true">⌄</span>
    </button>
    @if (open()) {
      <div class="language-menu" role="listbox" [attr.aria-label]="active().label">
        @for (language of languageService.languages; track language.code) {
          <button
            type="button"
            role="option"
            [attr.aria-selected]="language.code === active().code"
            [class.active]="language.code === active().code"
            (click)="select(language.code)"
          >
            <img
              class="language-flag"
              [src]="language.flagSrc"
              [alt]="language.flagAlt"
              width="28"
              height="21"
            />
            <span>{{ language.label }}</span>
            @if (language.code === active().code) {
              <span class="language-check" aria-hidden="true">✓</span>
            }
          </button>
        }
      </div>
    }
  `,
})
export class LanguageSwitcherComponent {
  readonly languageService = inject(LanguageService);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  readonly open = signal(false);
  readonly active = computed(
    () =>
      this.languageService.languages.find(
        (language) => language.code === this.languageService.activeLanguage(),
      ) ?? this.languageService.languages[0],
  );

  toggle(): void {
    this.open.update((value) => !value);
  }
  async select(code: LanguageCode): Promise<void> {
    this.open.set(false);
    await this.languageService.changeLanguage(code);
  }
  @HostListener('document:click', ['$event']) onDocumentClick(event: Event): void {
    if (!this.element.nativeElement.contains(event.target as Node)) this.open.set(false);
  }
  @HostListener('document:keydown.escape') onEscape(): void {
    this.open.set(false);
    this.document.defaultView?.requestAnimationFrame(() => {
      const trigger = this.element.nativeElement.querySelector(
        '.language-trigger',
      ) as HTMLButtonElement | null;
      trigger?.focus();
    });
  }
}
