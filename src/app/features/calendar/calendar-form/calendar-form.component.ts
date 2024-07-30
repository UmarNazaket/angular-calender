import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {
  form: FormGroup;
  @Output() addAppointment = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.addAppointment.emit(this.form.value);
      this.form.reset();
    }
  }
}
