import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-edit-appointment-dialog',
  templateUrl: './add-edit-appointment-dialog.component.html',
  styleUrls: ['./add-edit-appointment-dialog.component.scss']
})
export class AddEditAppointmentDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [data.appointment ? data.appointment.id : uuidv4()],
      title: ['', Validators.required],
      description: [''],
      date: [data.date || '', Validators.required],
      time: ['', Validators.required]
    });

    if (data.appointment) {
      const appointmentDate = new Date(data.appointment.date);
      const hours = appointmentDate.getHours().toString().padStart(2, '0');
      const minutes = appointmentDate.getMinutes().toString().padStart(2, '0');
      this.form.patchValue({
        ...data.appointment,
        date: appointmentDate,
        time: `${hours}:${minutes}`
      });
    }
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      formValue.date = new Date(formValue.date);
      formValue.date.setHours(parseInt(formValue.time.split(':')[0], 10));
      formValue.date.setMinutes(parseInt(formValue.time.split(':')[1], 10));
      delete formValue.time;
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
