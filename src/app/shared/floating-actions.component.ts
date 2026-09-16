import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-floating-actions',
  template: `<div class="floating-actions"><a class="float-btn whatsapp" [href]="whatsappUrl" target="_blank" rel="noopener" aria-label="Écrire à Zakiya Bio sur WhatsApp">WA</a>@if (visible()) {<button class="float-btn top" type="button" (click)="scrollTop()" aria-label="Remonter en haut">↑</button>}</div>`,
})
export class FloatingActionsComponent {
  private readonly document = inject(DOCUMENT); readonly visible = signal(false); readonly whatsappUrl = buildWhatsAppUrl('Bonjour Zakiya Bio, je souhaite découvrir vos articles.');
  @HostListener('window:scroll') onScroll(): void { this.visible.set((this.document.defaultView?.scrollY ?? 0) > 500); }
  scrollTop(): void { this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' }); }
}
