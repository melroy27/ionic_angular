import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private DataPlaces = new BehaviorSubject<Place[]>(
    // dummy places
    [
      new Place(
        'p1',
        'Manhattan Mansion',
        'In the heart of NY City',
        'https://viewfinder.expedia.com/wp-content/uploads/2020/01/new-york-date-ideas-header-1140x630.jpg',
        45.99,
        new Date('2021-01-01'),
        new Date('2021-12-31'),
        'abc'
      ),

      new Place(
        'p2',
        'Maharaja Palace',
        'In The City of Mumbai',
        'https://cdn.cdnparenting.com/articles/2018/12/702408349-H.jpg',
        25.99,
        new Date('2021-01-01'),
        new Date('2021-12-31'),
        'xyz'
      )
    ]
  );
  get places() {
    return this.DataPlaces.asObservable();
  }
  getPlace(id: string) {
    return this.DataPlaces.pipe(take(1), map(places => {
      return { ...places.find(p => p.id === id) };
    })
    );
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(Math.random().toString(), title, description, '', price, dateFrom, dateTo, this.authService.userId);

    return this.DataPlaces.pipe(take(1), delay(1000), tap(places => {

      this.DataPlaces.next(places.concat(newPlace));

    }));
  }
  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(take(1), delay(1000), tap(places => {
      const updatePlaceIndex = places.findIndex(pl =>
        pl.id === placeId
      );
      const updatePlaces = [...places];
      const old = updatePlaces[updatePlaceIndex];
      // tslint:disable-next-line: max-line-length
      updatePlaces[updatePlaceIndex] = new Place(old.id, title, description, old.imageUrl, old.price, old.availableFrom, old.availableTo, old.userId);
      this.DataPlaces.next(updatePlaces);
    }));
  }
  constructor(private authService: AuthService) { }
}
