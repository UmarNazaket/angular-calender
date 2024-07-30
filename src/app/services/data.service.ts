import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageKey = 'appointments';

  constructor() {
    if (this.isLocalStorageAvailable()) {
      if (!localStorage.getItem(this.storageKey)) {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
      }
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getDaysForMonth(month: Date): any[] {
    const days = [];
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
      days.push({
        date: new Date(day),
        appointments: this.getAppointmentsForDay(new Date(day))
      });
    }

    return days;
  }

  getAppointmentsForDay(day: Date): any[] {
    const appointments = this.getAppointments();
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === day.toDateString();
    });
  }

  addAppointment(appointment: any): void {
    if (this.isLocalStorageAvailable()) {
      const appointments = this.getAppointments();
      appointment.id = uuidv4(); // Assign a unique ID
      appointments.push(appointment);
      localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }
  }

  deleteAppointment(id: string): void {
    if (this.isLocalStorageAvailable()) {
      let appointments = this.getAppointments();
      appointments = appointments.filter(appointment => appointment.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }
  }

  updateAppointment(updatedAppointment: any): void {
    if (this.isLocalStorageAvailable()) {
      const appointments = this.getAppointments().map(appointment =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      );
      localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }
  }

  getAppointments(): any[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
    return [];
  }

  updateAppointmentDate(id: string, newDate: string): void {
    if (this.isLocalStorageAvailable()) {
      const appointments = this.getAppointments().map(appointment => {
        if (appointment.id === id) {
          appointment.date = newDate;
        }
        return appointment;
      });
      localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }
  }
}
