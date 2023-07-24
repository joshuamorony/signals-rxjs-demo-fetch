import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Injectable, computed, inject, signal } from "@angular/core";
import { Article } from "../../shared/interfaces/article";
import { ApiService } from "../../shared/data-access/api.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";

export interface ArticleDetailState {
  article: Article | null;
  status: "loading" | "success" | "error";
  error: string | null;
}

@Injectable()
export class ArticleDetailService {
  private apiService = inject(ApiService);
  private paramMap = inject(ActivatedRoute).paramMap;

  private state = signal<ArticleDetailState>({
    article: null,
    status: "loading",
    error: null,
  });

  // selectors
  article = computed(() => this.state().article);
  status = computed(() => this.state().status);
  error = computed(() => this.state().error);

  // sources
  articleLoaded$ = this.paramMap.pipe(
    switchMap((params) => this.apiService.getArticleById(params.get("id")))
  );

  constructor() {
    //  reducers
    this.articleLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (article) =>
        this.state.update((state) => ({
          ...state,
          article,
          status: "success",
          error: null,
        })),
      error: (error) =>
        this.state.update((state) => ({ ...state, error, status: "error" })),
    });
  }
}
