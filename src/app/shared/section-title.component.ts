import { Component, input } from '@angular/core';
@Component({ selector: 'app-section-title', template: `<div class="section-title" [class.center]="center()"><span>{{ eyebrow() }}</span><h2>{{ title() }}</h2>@if (description()) {<p>{{ description() }}</p>}</div>` })
export class SectionTitleComponent { readonly eyebrow = input('Zakiya Bio'); readonly title = input.required<string>(); readonly description = input(''); readonly center = input(true); }
