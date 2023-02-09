import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form [formGroup]="formGroup" (ngSubmit)="handleSave()">
        <ion-item *ngFor="let control of formGroup.controls | keyvalue">
          <ion-label position="stacked">{{ control.key }}</ion-label>
          <ion-input type="text" [formControlName]="control.key"></ion-input>
        </ion-item>
        <ion-button
          color="dark"
          expand="full"
          type="submit"
          [disabled]="!formGroup.valid"
        >
          <ion-icon slot="start" name="save-outline"></ion-icon> Save
        </ion-button>
      </form>
    </ion-content>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// styles - The :host pseudo-selector allows us to target the host element of the component itself, not elements within the component. Setting this to 100% height will fix our display issue.

export class FormModalComponent {
  constructor(private modalCtrl: ModalController) {}

  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Output() save = new EventEmitter<boolean>();

  handleSave() {
    this.save.emit(true);
    this.dismiss();
  }

  dismiss() {
    this.formGroup.reset();
    this.modalCtrl.dismiss();
  }
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [FormModalComponent],
  exports: [FormModalComponent],
})
export class FormModalComponentModule {}
