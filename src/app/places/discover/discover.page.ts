import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  private placesSub: Subscription;
  loadedPlaces: Place[];
  relavantPlaces: Place[];
  listedLoadedPlaces: Place[];
  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relavantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relavantPlaces.slice(1);
    });
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
  // onOpenMenu() {
  //   this.menuCtrl.toggle(); manually open
  // }
  onFilterUpdate(event: CustomEvent) {
    console.log(event.detail);
    if (event.detail.value === 'all') {
      this.relavantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relavantPlaces.slice(1);
    }
    else {
      this.relavantPlaces = this.loadedPlaces.filter(place => place.userId !== this.authService.userId);
    }
    this.listedLoadedPlaces = this.relavantPlaces.slice(1);
  }
}
