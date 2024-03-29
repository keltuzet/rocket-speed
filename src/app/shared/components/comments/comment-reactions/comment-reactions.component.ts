import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EmojiMenuComponent } from '@shared/components';
import {
  CommentReactionDetails,
  Comment,
  CommentReactionAuthorDetails,
  CommentsService,
  CommentReaction,
} from '@stores/comments';
import { UsersQuery } from '@stores/users';

@Component({
  selector: 't-comment-reactions',
  templateUrl: './comment-reactions.component.html',
  styleUrls: ['./comment-reactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentReactionsComponent implements OnInit {
  @Input() relatedTodoId: string;
  @Input('comment') set setComment(value: Comment) {
    if (!value.reacts || !this.hasAnyReaction(value.reacts)) {
      this.displayReactions$.next(false);
      this.reactions$.next([]);
      return;
    }
    this.comment = value;
    const commentReactionDetails: CommentReactionDetails[] = this.commentToReactionsDetails(value);
    this.displayReactions$.next(true);
    this.reactions$.next(commentReactionDetails);
  }
  readonly authorsMap = new Map<string, CommentReactionAuthorDetails>();
  readonly reactions$ = new BehaviorSubject<CommentReactionDetails[]>([]);
  readonly displayReactions$ = new BehaviorSubject<boolean>(false);
  readonly emojiMenu = EmojiMenuComponent;
  private comment: Comment;

  constructor(private usersQuery: UsersQuery, private commentsService: CommentsService) {}

  ngOnInit(): void {}

  toggleReact(emoji: string): void {
    if (!emoji) return;
    this.commentsService.toggleReactToComment(emoji, this.comment.id).subscribe();
  }

  private commentToReactionsDetails(comment: Comment): CommentReactionDetails[] {
    const reactionsEntries = Object.entries(comment.reacts);
    return reactionsEntries.map<CommentReactionDetails>(([emoji, authorsHint]) => {
      const authors = authorsHint.map<CommentReactionAuthorDetails>(({ authorId, reactedDate }) => {
        let authorDetails: CommentReactionAuthorDetails;
        if (this.authorsMap.has(authorId)) {
          authorDetails = this.authorsMap.get(authorId);
        } else {
          authorDetails = {
            ...this.usersQuery.getEntity(authorId),
            authorId,
            reactedDate,
          };
          this.authorsMap.set(authorId, authorDetails);
        }

        return authorDetails;
      });

      return {
        emoji,
        authors,
        count: authors.length,
      };
    });
  }

  private hasAnyReaction(reactionsMap: CommentReaction): boolean {
    return Object.values(reactionsMap).some(reactions => reactions.length);
  }
}
