import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private dataBooking: Booking[] = [
    {
      id: 'b1',
      placeId: 'p1',
      placeTitle: 'Manhattan Mansion',
      guestNumber: 2,
      userId: 'abc'
    }
  ];

  constructor() { }

  get bookings() {
    return [...this.dataBooking];
  }
}
