import { Component, inject } from "@angular/core";
import { ArticleDetailService } from "./data-access/article-detail.service";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-article-detail",
  template: `
    <ng-container *ngIf="ads.article() as article; else loading">
      <h1>{{ article.title }}</h1>
      <p>
        If I were determined enough to follow through with these jokes I would
        also get ChatGPT to write fake articles for these titles as well
      </p>
    </ng-container>
    <ng-template #loading>
      <p *ngIf="ads.status() === 'loading'">Loading...</p>
      <p *ngIf="ads.status() === 'error'">{{ ads.error() }}</p>
    </ng-template>
  `,
  providers: [ArticleDetailService],
  imports: [CommonModule],
})
export default class ArticleDetailComponent {
  public ads = inject(ArticleDetailService);
}
