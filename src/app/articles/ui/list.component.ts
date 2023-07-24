import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Article } from "../../shared/interfaces/article";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-list",
  template: `
    <ul>
      <li *ngFor="let article of articles">
        <a [routerLink]="article.id">{{ article.title }}</a>
      </li>
    </ul>
  `,
  imports: [CommonModule, RouterModule],
  styles: [
    `
      ul {
        padding: 0;
      }
      li {
        border: 1px solid #bdc3c7;
        list-style: none;
        margin-bottom: 1rem;
        padding: 1rem;
      }
    `,
  ],
})
export class ListComponent {
  @Input({ required: true }) articles!: Article[];
}
