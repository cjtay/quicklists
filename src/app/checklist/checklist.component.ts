import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';

@Component({
  selector: 'app-checklist',
  template: `
    <ng-container
      *ngIf="{
        checklist: (checklist$ | async)!,
        formModalIsOpen: (formModalIsOpen$ | async)!
      } as vm"
    >
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>
            {{ vm.checklist.title }}
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content><p>checklist.component.ts</p> </ion-content>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent {
  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService,
    private fb: FormBuilder
  ) {}

  checklist$ = this.route.paramMap.pipe(
    switchMap((paramMap) =>
      this.checklistService.getChecklistById(paramMap.get('id') as string)
    )
  );

  formModalIsOpen$ = new BehaviorSubject<boolean>(false);
  checklistItemForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });
}

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChecklistComponent,
      },
    ]),
  ],
  declarations: [ChecklistComponent],
})
export class ChecklistComponentModule {}
