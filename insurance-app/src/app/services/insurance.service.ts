import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { InsurancePlan } from '../models/plan.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService  {
  private baseURL = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  getPlans(): Observable<any> {
    return this.http.get(`${this.baseURL}/plans`);
  }

  getPlan(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/plans/${id}`);
  }

  saveBooking(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/bookings`, data);
  }


}
