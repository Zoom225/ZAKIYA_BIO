import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-section-title',
  imports: [TranslatePipe],
  template: `<div class="section-title" [class.center]="center()">
    <span>{{ eyebrow() | translate }}</span>
    <h2>{{ title() | translate }}</h2>
    @if (description()) {
      <p>{{ description() | translate }}</p>
    }
  </div>`,
})
export class SectionTitleComponent {
  readonly eyebrow = input('COMMON.BRAND');
  readonly title = input.required<string>();
  readonly description = input('');
  readonly center = input(true);
}
