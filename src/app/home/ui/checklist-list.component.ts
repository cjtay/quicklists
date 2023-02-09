import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Checklist } from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  template: `
    <ion-list lines="none">
      <ion-item
        *ngFor="let checklist of checklists; trackBy: trackByFn"
        button
        routerLink="/checklist/{{ checklist.id }}"
        routerDirection="forward"
      >
        <ion-label> {{ checklist.title }}</ion-label>
      </ion-item>
    </ion-list>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistListComponent {
  @Input() checklists!: Checklist[];
  constructor() {}
  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }
}

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [ChecklistListComponent],
  exports: [ChecklistListComponent],
})
export class ChecklistListComponentModule {}
