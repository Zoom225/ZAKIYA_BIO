import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslatePipe],
  template: `<section class="not-found">
    <div>
      <span>404</span>
      <h1>{{ 'COMMON.NOT_FOUND.TITLE' | translate }}</h1>
      <p>{{ 'COMMON.NOT_FOUND.TEXT' | translate }}</p>
      <div>
        <a routerLink="/" class="btn btn-primary">{{ 'COMMON.NOT_FOUND.HOME' | translate }}</a
        ><a routerLink="/articles" class="btn btn-outline">{{
          'COMMON.NOT_FOUND.ARTICLES' | translate
        }}</a>
      </div>
    </div>
  </section>`,
})
export class NotFoundComponent {}
