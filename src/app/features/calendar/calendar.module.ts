import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { AddEditAppointmentDialogComponent } from './add-edit-appointment-dialog/add-edit-appointment-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularMaterialModule } from '../shared/angular-material.module';

const routes: Routes = [
  { path: '', component: CalendarViewComponent }
];

@NgModule({
  declarations: [
    CalendarViewComponent,
    CalendarFormComponent,
    CalendarItemComponent,
    AddEditAppointmentDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class CalendarModule { }
