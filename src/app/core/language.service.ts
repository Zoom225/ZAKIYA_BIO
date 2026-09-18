import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

export type LanguageCode = 'fr' | 'en' | 'ar';

export interface LanguageOption {
  readonly code: LanguageCode;
  readonly label: string;
  readonly flagSrc: string;
  readonly flagAlt: string;
  readonly selectorAriaLabel: string;
  readonly direction: 'ltr' | 'rtl';
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'zakiya-bio-language';

  readonly languages: readonly LanguageOption[] = [
    {
      code: 'fr',
      label: 'Français',
      flagSrc: '/images/flags/france.svg',
      flagAlt: 'Drapeau de la France',
      selectorAriaLabel: 'Langue sélectionnée : Français',
      direction: 'ltr',
    },
    {
      code: 'en',
      label: 'English',
      flagSrc: '/images/flags/united-kingdom.svg',
      flagAlt: 'Flag of the United Kingdom',
      selectorAriaLabel: 'Selected language: English',
      direction: 'ltr',
    },
    {
      code: 'ar',
      label: 'العربية',
      flagSrc: '/images/flags/saudi-arabia.svg',
      flagAlt: 'علم المملكة العربية السعودية',
      selectorAriaLabel: 'اللغة المحددة: العربية',
      direction: 'rtl',
    },
  ];
  readonly activeLanguage = signal<LanguageCode>('fr');

  async initialize(): Promise<void> {
    this.translate.addLangs(this.languages.map(({ code }) => code));
    const saved = this.readSavedLanguage();
    await this.applyLanguage(saved, true);
  }

  async changeLanguage(code: string): Promise<void> {
    await this.applyLanguage(this.isLanguageCode(code) ? code : 'fr', true);
  }

  isLanguageCode(code: string | null): code is LanguageCode {
    return this.languages.some((language) => language.code === code);
  }

  private async applyLanguage(code: LanguageCode, persist: boolean): Promise<void> {
    const language = this.languages.find((item) => item.code === code) ?? this.languages[0];
    this.document.documentElement.lang = language.code;
    this.document.documentElement.dir = language.direction;
    await firstValueFrom(this.translate.use(language.code));
    this.activeLanguage.set(language.code);
    if (persist && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, language.code);
    }
  }

  private readSavedLanguage(): LanguageCode {
    if (!isPlatformBrowser(this.platformId)) return 'fr';
    const saved = localStorage.getItem(this.storageKey);
    return this.isLanguageCode(saved) ? saved : 'fr';
  }
}
