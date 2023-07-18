import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MenuRef, MENU_DATA } from 'todoist-menu';

import { Tag } from '@stores/tags';
import { TagsQuery } from '@stores/tags';

interface TagOption extends Tag {
  checked: boolean;
}

@Component({
  selector: 't-select-tags',
  templateUrl: './select-tags-menu.component.html',
  styleUrls: ['./select-tags-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTagsMenuComponent {
  readonly hasAnyTags$ = this.tagsQuery.selectCount().pipe(map<number, boolean>(Boolean));
  readonly filterControl = new UntypedFormControl();
  readonly filter$: Observable<string> = this.filterControl.valueChanges.pipe(startWith(''));
  readonly selectedTagIds$ = new BehaviorSubject<string[]>([]);
  // readonly filteredTags$ = this.filterControl.valueChanges.pipe(startWith(''));
  readonly hasAnyTagsForFilter$: Observable<boolean>;
  readonly unsharedTags$ = this.getTagOptions(this.tagsQuery.unshared$);
  readonly sharedTags$ = this.getTagOptions(this.tagsQuery.shared$);
  readonly hasAnySharedTags$ = this.tagsQuery.shared$.pipe(map(items => Boolean(items.length)));

  constructor(private tagsQuery: TagsQuery, private menuRef: MenuRef, @Inject(MENU_DATA) existingTagIds: string[]) {
    const initialValue = existingTagIds || [];
    this.selectedTagIds$.next(initialValue);
    this.menuRef.backdropCloseValue = initialValue;

    this.hasAnyTagsForFilter$ = this.filter$.pipe(
      switchMap(filter => {
        const filletStr = filter.trim().toLocaleLowerCase();
        return this.tagsQuery.selectAll({
          filterBy: tag => tag.title.toLocaleLowerCase().trim().includes(filletStr),
        });
      }),
      map(tags => Boolean(tags.length)),
    );
  }

  private getTagOptions(tags$: Observable<Tag[]>): Observable<TagOption[]> {
    return combineLatest([tags$, this.selectedTagIds$.asObservable(), this.filter$]).pipe(
      map(([tags, ids, filter]) => {
        const setIds = new Set(ids || []);
        return tags
          .filter(item => !filter || item.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
          .map(tag => ({ ...tag, checked: setIds.has(tag.id) }));
      }),
    );
  }

  selectTag(id: string, checked: boolean): void {
    const selectedTagIds = this.selectedTagIds$.value;
    const set = new Set(selectedTagIds);
    checked ? set.delete(id) : set.add(id);
    const newTagIds = Array.from(set.values());
    this.selectedTagIds$.next(newTagIds);
    this.menuRef.backdropCloseValue = newTagIds;
  }
}
