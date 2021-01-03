import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSub: Subscription;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesSub =
      this.placesService.places.subscribe(places => {
        this.offers = places;
      });
  }
  onEdit(offerId: string) {
    console.log('The Item That is being edited is: ', offerId);

  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
