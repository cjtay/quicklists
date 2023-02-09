import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { FormModalComponentModule } from '../shared/ui/form-modal.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Home </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="formModalIsOpen$.next(true)">
            <ion-icon name="add" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-modal
        [isOpen]="formModalIsOpen$ | async"
        [canDismiss]="true"
        (ionModalDidDismiss)="formModalIsOpen$.next(false)"
      >
        <ng-template>
          <app-form-modal
            title="Create checklist"
            [formGroup]="checklistForm"
            (save)="addChecklist()"
          ></app-form-modal>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private checklistService: ChecklistService
  ) {}

  formModalIsOpen$ = new BehaviorSubject<boolean>(false);

  checklistForm = this.fb.group({
    title: ['', Validators.required],
  });

  addChecklist() {
    console.log('this.checklistForm.value', this.checklistForm.value);
    console.log(
      'this.checklistForm.getRawValue()',
      this.checklistForm.getRawValue()
    );
    this.checklistService.add(this.checklistForm.getRawValue());
    this.checklistService
      .getChecklists()
      .subscribe((value) => console.log('getchecklist', value));
  }
}

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormModalComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}
