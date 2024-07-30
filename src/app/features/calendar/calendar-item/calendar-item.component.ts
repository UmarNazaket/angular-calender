import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent {
  @Input() appointment: any;
  @Output() deleteAppointment = new EventEmitter<string>();

  onDelete(): void {
    this.deleteAppointment.emit(this.appointment.id);
  }
}
