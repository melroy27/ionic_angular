import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private DataPlaces: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of NY City',
      'https://viewfinder.expedia.com/wp-content/uploads/2020/01/new-york-date-ideas-header-1140x630.jpg',
      45.99),
    new Place(
      'p2',
      'Maharaja Palace',
      'In The City of Mumabai',
      'https://cdn.cdnparenting.com/articles/2018/12/702408349-H.jpg',
      25.99
    )
  ];
  get places() {
    return [...this.DataPlaces];
  }
  constructor() { }
}
