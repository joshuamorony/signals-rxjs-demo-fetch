import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "articles",
    loadComponent: () => import("./articles/articles.component"),
  },
  {
  path: "articles/:id",
  loadComponent: () => import("./articles/article-detail.component"),
  },
  {
    path: "",
    redirectTo: "articles",
    pathMatch: "full",
  },
];
