import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, switchMap } from "rxjs";
import { NgClass } from "@angular/common";
import { CommentsService } from "../services/comments.service";
import { UserService } from "../../../core/auth/services/user.service";
import { Comment } from "../models/comment.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-comment-favorite-button",
  template: `
    <button
      class="btn btn-sm"
      [ngClass]="{
        disabled: isSubmitting,
        'btn-outline-primary': !comment.favorited,
        'btn-primary': comment.favorited,
      }"
      (click)="toggleFavorite()"
    >
      <i class="ion-heart"></i>
      @if (comment.favoritesCount > 0) {
        <span class="counter">({{ comment.favoritesCount }})</span>
      }
    </button>
  `,
  imports: [NgClass],
})
export class CommentFavoriteButtonComponent {
  destroyRef = inject(DestroyRef);
  isSubmitting = false;

  @Input() comment!: Comment;
  @Input() articleSlug!: string;
  @Output() toggle = new EventEmitter<boolean>();

  constructor(
    private readonly commentsService: CommentsService,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  toggleFavorite(): void {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(
        switchMap((authenticated) => {
          if (!authenticated) {
            void this.router.navigate(["/register"]);
            return EMPTY;
          }

          if (!this.comment.favorited) {
            return this.commentsService.favorite(
              this.comment.id,
              this.articleSlug,
            );
          } else {
            return this.commentsService.unfavorite(
              this.comment.id,
              this.articleSlug,
            );
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.toggle.emit(!this.comment.favorited);
        },
        error: () => (this.isSubmitting = false),
      });
  }
}
