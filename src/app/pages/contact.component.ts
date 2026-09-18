import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SITE_CONFIG } from '../core/site.config';
import { buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslatePipe],
  template: `
    <section class="page-hero contact-hero">
      <div class="container">
        <span>{{ 'CONTACT.HERO.EYEBROW' | translate }}</span>
        <h1>{{ 'CONTACT.HERO.TITLE' | translate }}</h1>
        <p>{{ 'CONTACT.HERO.TEXT' | translate }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container contact-layout">
        <div class="contact-info">
          <span class="eyebrow">{{ 'CONTACT.INFO.EYEBROW' | translate }}</span>
          <h2>{{ 'CONTACT.INFO.TITLE' | translate }}</h2>
          <p>{{ 'CONTACT.INFO.TEXT' | translate }}</p>
          <div class="info-list">
            <a [href]="quickWhatsapp" target="_blank" rel="noopener"
              ><b>◉</b
              ><span
                ><small>{{ 'CONTACT.INFO.WHATSAPP_PRIMARY' | translate }}</small
                >{{ config.whatsapp }}</span
              ></a
            ><a [href]="secondaryWhatsapp" target="_blank" rel="noopener"
              ><b>◉</b
              ><span
                ><small>{{ 'CONTACT.INFO.WHATSAPP_SECONDARY' | translate }}</small
                >{{ config.whatsappSecondary }}</span
              ></a
            >
            @if (config.address) {
              <div>
                <b>⌖</b
                ><span
                  ><small>{{ 'CONTACT.INFO.ADDRESS' | translate }}</small
                  >{{ config.address }}</span
                >
              </div>
            }
            @if (config.email) {
              <a [href]="'mailto:' + config.email"
                ><b>✉</b
                ><span
                  ><small>{{ 'FORM.EMAIL' | translate }}</small
                  >{{ config.email }}</span
                ></a
              >
            }
          </div>
          <div class="whatsapp-card">
            <span>◉</span>
            <div>
              <h3>{{ 'CONTACT.INFO.QUICK_TITLE' | translate }}</h3>
              <p>{{ 'CONTACT.INFO.QUICK_TEXT' | translate }}</p>
            </div>
            <a class="btn btn-light" [href]="quickWhatsapp" target="_blank" rel="noopener">{{
              'CONTACT.INFO.START' | translate
            }}</a>
          </div>
        </div>
        <div class="form-card">
          <span class="eyebrow">{{ 'CONTACT.FORM.EYEBROW' | translate }}</span>
          <h2>{{ 'CONTACT.FORM.TITLE' | translate }}</h2>
          <form [formGroup]="form" (ngSubmit)="submit()" novalidate (focusin)="markStarted()">
            <div class="form-row">
              <label
                >{{ 'FORM.LAST_NAME' | translate }} <em>*</em
                ><input
                  formControlName="lastName"
                  autocomplete="family-name"
                  [class.invalid]="invalid('lastName')"
                />
                @if (invalid('lastName')) {
                  <small>{{ 'VALIDATION.MIN_TWO' | translate }}</small>
                }</label
              ><label
                >{{ 'FORM.FIRST_NAME' | translate }} <em>*</em
                ><input
                  formControlName="firstName"
                  autocomplete="given-name"
                  [class.invalid]="invalid('firstName')"
                />
                @if (invalid('firstName')) {
                  <small>{{ 'VALIDATION.MIN_TWO' | translate }}</small>
                }
              </label>
            </div>
            <label
              >{{ 'FORM.EMAIL' | translate }} <em>*</em
              ><input
                type="email"
                formControlName="email"
                autocomplete="email"
                [placeholder]="'FORM.EMAIL_PLACEHOLDER' | translate"
                [class.invalid]="invalid('email')"
              />
              @if (invalid('email')) {
                <small>{{ 'VALIDATION.EMAIL' | translate }}</small>
              }</label
            ><label
              >{{ 'FORM.PHONE' | translate }} <span>({{ 'FORM.OPTIONAL' | translate }})</span
              ><input type="tel" formControlName="phone" autocomplete="tel" /></label
            ><label
              >{{ 'FORM.SUBJECT' | translate }} <em>*</em
              ><select formControlName="subject" [class.invalid]="invalid('subject')">
                <option value="">{{ 'FORM.SUBJECT_PLACEHOLDER' | translate }}</option>
                <option value="availability">{{ 'FORM.SUBJECTS.AVAILABILITY' | translate }}</option>
                <option value="advice">{{ 'FORM.SUBJECTS.ADVICE' | translate }}</option>
                <option value="order">{{ 'FORM.SUBJECTS.ORDER' | translate }}</option>
                <option value="other">{{ 'FORM.SUBJECTS.OTHER' | translate }}</option>
              </select>
              @if (invalid('subject')) {
                <small>{{ 'VALIDATION.SUBJECT' | translate }}</small>
              }</label
            ><label
              >{{ 'FORM.MESSAGE' | translate }} <em>*</em
              ><textarea
                rows="5"
                formControlName="message"
                [placeholder]="'FORM.MESSAGE_PLACEHOLDER' | translate"
                [class.invalid]="invalid('message')"
              ></textarea>
              @if (invalid('message')) {
                <small>{{ 'VALIDATION.MESSAGE' | translate }}</small>
              }</label
            ><button class="btn btn-primary btn-wide" type="submit">
              {{ 'FORM.SUBMIT' | translate }} <span class="directional-icon">→</span>
            </button>
            <p class="form-note">{{ 'FORM.NOTE' | translate }}</p>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService, { optional: true });
  readonly config = SITE_CONFIG;
  readonly submitted = signal(false);
  readonly started = signal(false);
  get quickWhatsapp(): string {
    return buildWhatsAppUrl(
      this.translation(
        'COMMON.WHATSAPP_INFO_MESSAGE',
        'Bonjour Zakiya Bio, je souhaite obtenir des informations.',
      ),
    );
  }
  get secondaryWhatsapp(): string {
    return `https://wa.me/${SITE_CONFIG.whatsappSecondaryDigits}?text=${encodeURIComponent(this.translation('COMMON.WHATSAPP_INFO_MESSAGE', 'Bonjour Zakiya Bio, je souhaite obtenir des informations.'))}`;
  }
  readonly form = this.fb.nonNullable.group({
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted());
  }
  markStarted(): void {
    this.started.set(true);
  }
  submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    const subject = this.translation(`FORM.SUBJECTS.${v.subject.toUpperCase()}`, v.subject);
    const phone = v.phone
      ? this.translation('FORM.WHATSAPP_PHONE', `\nTéléphone : ${v.phone}`, { phone: v.phone })
      : '';
    const fallback = `Bonjour Zakiya Bio,\n\nJe suis ${v.firstName} ${v.lastName}.\nSujet : ${subject}\nMessage : ${v.message}\nE-mail : ${v.email}${phone}`;
    const message = this.translation('FORM.WHATSAPP_MESSAGE', fallback, {
      firstName: v.firstName,
      lastName: v.lastName,
      subject,
      message: v.message,
      email: v.email,
      phone,
    });
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener');
  }
  private translation(key: string, fallback: string, params?: Record<string, string>): string {
    return this.translate?.instant(key, params) ?? fallback;
  }
}
