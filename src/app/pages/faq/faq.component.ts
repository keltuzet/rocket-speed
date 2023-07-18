import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PROJECT_COLORS, PROJECT_DEFAULT_COLOR, PROJECT_INBOX_COLOR } from '@shared/const';
import { FaqQuery, FaqService } from '@stores/faq';
import { InboxProject, Project, SelectedProject } from '@stores/projects';
import { Timestamp } from 'firebase/firestore';
import { filter } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 't-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  clicks = 0;
  name;
  addForm = new UntypedFormGroup({
    question: new UntypedFormControl(null, Validators.required),
    content: new UntypedFormControl(null, Validators.required),
  });
  list$ = this.faqQuery.selectAll();
  items: any[];
  mock: InboxProject = {
    isIncoming: true,
    color: PROJECT_INBOX_COLOR,
  };

  mock2: SelectedProject = {
    id: 'e2r3t4',
    title: 'Cooking',
    color: PROJECT_DEFAULT_COLOR,
    status: {
      id: 'status-id',
      title: 'Master Chicken Chef',
    },
    users: [],
  };

  constructor(
    private faqQuery: FaqQuery,
    private faqService: FaqService,
    private firestore: AngularFirestore,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.faqQuery
      .selectAll()
      .pipe(filter(list => Boolean(list.length)))
      .subscribe(faqList => {
        this.items = faqList;
      });

    const date = new Timestamp(new Date().getTime() / 1000, 0);
    setTimeout(() => {
      this.name = 'Tom'
      this.cdr.detectChanges()
    }, 1000);
  }

  add(): void {
    if (this.addForm.invalid) return;
  }

  remove(): void {
    if (this.items.length <= 1) return;
    this.faqService.remove(this.items[0].id);
  }
  onChanged(e: boolean) {
    e ? this.clicks++ : this.clicks--
  }
}
