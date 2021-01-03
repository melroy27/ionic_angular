import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { BookingService } from '../../../bookings/booking.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  private placeSub: Subscription;
  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private placesService: PlacesService,
    private actionSheet: ActionSheetController,
    private modalCtl: ModalController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
  onBookPlace() {
    this.actionSheet.create({
      header: 'Choose',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionEl => {
      actionEl.present();
    });
    // this.navCrtl.navigateBack('/places/tabs/discover');
  }
  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtl.create({
      component: CreateBookingComponent, componentProps: {
        selectedPlace: this.place, selectedMode: mode
      }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.role, resultData.data);
      if (resultData.role === 'confirm') {
        this.loadingCtrl.create({
          message: 'Booking Place...'
        }).then(loadingEl => {
          loadingEl.present();
          const data = resultData.data.bookingData;
          // tslint:disable-next-line: max-line-length
          this.bookingService.addBooking(
            this.place.id,
            this.place.title,
            this.place.imageUrl,
            data.firstName,
            data.lastName,
            data.guestNumber,
            data.startDate,
            data.endDate
          ).subscribe(() => {
            loadingEl.dismiss();
          });
        });
      }
    });
  }
}
