import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, ElementRef, ViewChild, Inject } from '@angular/core';

interface DocSelection extends Selection {
  baseOffset: number;
  extentOffset: number;
}

@Component({
  selector: 't-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentEditorComponent {
  @ViewChild('textbox', { read: ElementRef, static: true }) textboxRef: ElementRef<HTMLDivElement>;
  @Input() placeholder = 'Написать комментарий';
  @Input() set text(value: string) {
    if (!value) return;
    this.textbox.innerHTML = value;
  }
  get text(): string {
    return this.textbox.innerHTML;
  }

  get textbox(): HTMLDivElement {
    return this.textboxRef.nativeElement;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  handleKeyUp(event: KeyboardEvent): void {
    if (event.code === 'Backspace' && this.isTextboxEmpty()) {
      this.clearTextboxInner();
    }
  }

  clearTextboxInner(): void {
    this.textbox.innerHTML = '';
  }

  private isTextboxEmpty(): boolean {
    const textboxEl = this.textbox;
    return (
      textboxEl.childNodes.length <= 1 &&
      (textboxEl.firstChild instanceof HTMLBRElement || textboxEl.firstChild instanceof HTMLDivElement)
    );
  }

  public insertText(text: string): void {
    console.log('insertText');
    let sel: Selection
    let range: Range;
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(this.document.createTextNode('da'));
    }
  }
}
