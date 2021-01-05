import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private dataBooking = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) { }

  get bookings() {
    return this.dataBooking.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {

    const newBooking = new Booking(Math.random.toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.bookings.pipe(take(1), delay(1000), tap(booking => {
      this.dataBooking.next(booking.concat(newBooking));
    })
    );
  }
  cancelBooking(bookingId: string) {
    return this.bookings.pipe(take(1), delay(1000), tap(booking => {
      this.dataBooking.next(booking.filter(b => b.id !== bookingId));
    })
    );
  }
}

