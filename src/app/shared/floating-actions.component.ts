import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-floating-actions',
  imports: [TranslatePipe],
  template: `<div class="floating-actions">
    <a
      class="float-btn whatsapp"
      [href]="whatsappUrl"
      target="_blank"
      rel="noopener"
      [attr.aria-label]="'ACCESSIBILITY.WHATSAPP' | translate"
      ><span aria-hidden="true">◉</span> WhatsApp</a
    >
    @if (visible()) {
      <button
        class="float-btn top"
        type="button"
        (click)="scrollTop()"
        [attr.aria-label]="'ACCESSIBILITY.BACK_TO_TOP' | translate"
      >
        ↑
      </button>
    }
  </div>`,
})
export class FloatingActionsComponent {
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  readonly visible = signal(false);
  get whatsappUrl(): string {
    return buildWhatsAppUrl(this.translate.instant('COMMON.WHATSAPP_DISCOVER_MESSAGE'));
  }
  @HostListener('window:scroll') onScroll(): void {
    this.visible.set((this.document.defaultView?.scrollY ?? 0) > 500);
  }
  scrollTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
