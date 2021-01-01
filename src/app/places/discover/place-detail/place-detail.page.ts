import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private router: Router, private placesService: PlacesService, private modalCtl: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }
  onBookPlace() {
    // this.navCrtl.navigateBack('/places/tabs/discover');
    this.modalCtl.create({
      component: CreateBookingComponent, componentProps: {
        selectedPlace: this.place
      }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.role, resultData.data);
      if (resultData.role === 'confirm') {
        console.log('BOOKED');
      }
    });
  }
}
