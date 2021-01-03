import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  private placeSub: Subscription;
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private placesServices: PlacesService, private navCtrl: NavController, private router: Router, private loaderCtl: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSub = this.placesServices.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.form = this.fb.group({
          title: [this.place.title, [
            Validators.required,
          ]],
          description: [this.place.description, [
            Validators.required,
            Validators.maxLength(180)
          ]]
        }, { updateOn: 'blur' });
      });
    });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loaderCtl.create({
      message: 'Updating Place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesServices.updatePlace(this.place.id, this.form.value.title, this.form.value.description).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers']);
      });
    });
  }
}
