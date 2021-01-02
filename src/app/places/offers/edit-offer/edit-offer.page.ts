import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private placesServices: PlacesService, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesServices.getPlace(paramMap.get('placeId'));
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
  }
  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }
}
