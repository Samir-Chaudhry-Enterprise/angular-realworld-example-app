import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { UserService } from "../../../core/auth/services/user.service";
import { User } from "../../../core/auth/user.model";
import { RouterLink } from "@angular/router";
import { map } from "rxjs/operators";
import { Comment } from "../models/comment.model";
import { AsyncPipe, DatePipe } from "@angular/common";
import { CommentFavoriteButtonComponent } from "./comment-favorite-button.component";

@Component({
  selector: "app-article-comment",
  template: `
    @if (comment) {
      <div class="card">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <a
            class="comment-author"
            [routerLink]="['/profile', comment.author.username]"
          >
            <img [src]="comment.author.image" class="comment-author-img" />
          </a>
          &nbsp;
          <a
            class="comment-author"
            [routerLink]="['/profile', comment.author.username]"
          >
            {{ comment.author.username }}
          </a>
          <span class="date-posted">
            {{ comment.createdAt | date: "longDate" }}
          </span>
          <span class="comment-actions">
            <app-comment-favorite-button
              [comment]="comment"
              [articleSlug]="articleSlug"
              (toggle)="onFavoriteToggle($event)"
            ></app-comment-favorite-button>
            @if (canModify$ | async) {
              <span class="mod-options">
                <i class="ion-trash-a" (click)="delete.emit(true)"></i>
              </span>
            }
          </span>
        </div>
      </div>
    }
  `,
  imports: [RouterLink, DatePipe, AsyncPipe, CommentFavoriteButtonComponent],
})
export class ArticleCommentComponent {
  @Input() comment!: Comment;
  @Input() articleSlug!: string;
  @Output() delete = new EventEmitter<boolean>();
  @Output() favoriteToggle = new EventEmitter<{
    comment: Comment;
    favorited: boolean;
  }>();

  canModify$ = inject(UserService).currentUser.pipe(
    map(
      (userData: User | null) =>
        userData?.username === this.comment.author.username,
    ),
  );

  onFavoriteToggle(favorited: boolean): void {
    this.comment.favorited = favorited;
    if (favorited) {
      this.comment.favoritesCount++;
    } else {
      this.comment.favoritesCount--;
    }
    this.favoriteToggle.emit({ comment: this.comment, favorited });
  }
}
