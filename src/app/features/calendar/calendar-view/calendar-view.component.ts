import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import { AddEditAppointmentDialogComponent } from '../add-edit-appointment-dialog/add-edit-appointment-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  days: any[] = [];
  selectedMonth: Date;
  today: Date;
  connectedTo: string[] = [];

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.selectedMonth = new Date();
    this.today = new Date();
  }

  ngOnInit(): void {
    this.loadDaysForMonth(this.selectedMonth);
  }

  loadDaysForMonth(month: Date): void {
    this.days = this.dataService.getDaysForMonth(month);
    this.connectedTo = this.days.map(day => day.date.toISOString());
  }

  onAddAppointment(appointment: any): void {
    this.dataService.addAppointment(appointment);
    this.loadDaysForMonth(this.selectedMonth);
  }

  onDeleteAppointment(id: string): void {
    this.dataService.deleteAppointment(id);
    this.loadDaysForMonth(this.selectedMonth);
  }

  openAddDialog(date: Date): void {
    const dialogRef = this.dialog.open(AddEditAppointmentDialogComponent, {
      width: '300px',
      data: { date }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAddAppointment(result);
      }
    });
  }

  openEditDialog(appointment: any): void {
    const dialogRef = this.dialog.open(AddEditAppointmentDialogComponent, {
      width: '300px',
      data: { appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteAppointment(appointment.id);
        this.onAddAppointment(result);
      }
    });
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer !== event.container) {
      const movedAppointment = event.item.data;
      const newDate = new Date(event.container.id);

      const originalDate = new Date(movedAppointment.date);
      newDate.setHours(originalDate.getHours());
      newDate.setMinutes(originalDate.getMinutes());

      const updatedAppointment = {
        ...movedAppointment,
        date: newDate.toISOString()
      };

      this.dataService.updateAppointment(updatedAppointment);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.loadDaysForMonth(this.selectedMonth);
    }
  }

  prevMonth(): void {
    const newMonth = new Date(this.selectedMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    this.selectedMonth = newMonth;
    this.loadDaysForMonth(this.selectedMonth);
  }

  nextMonth(): void {
    const newMonth = new Date(this.selectedMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.selectedMonth = newMonth;
    this.loadDaysForMonth(this.selectedMonth);
  }

  isToday(date: Date): boolean {
    return date.toDateString() === this.today.toDateString();
  }
}
