import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private placesService: PlacesService,
    private loaderCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, [
        Validators.required,
      ]

      ],
      description: [null, [
        Validators.required,
        Validators.maxLength(180)
      ]],
      price: [null, {
        updateOn: 'blur'
      }, [
          Validators.required,
          Validators.min(1)
        ]],
      dateFrom: [null, [
        Validators.required,
      ]],
      dateTo: [null, [
        Validators.required
      ]
      ]
    }, { updateOn: 'blur' });
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loaderCtrl.create({
      message: 'Creating Place..'
    }).then(loadEl => {
      loadEl.present();
      this.placesService.addPlace
        (
          this.form.value.title,
          this.form.value.description,
          +this.form.value.price,
          new Date(this.form.value.dateFrom),
          new Date(this.form.value.dateTo)
        ).subscribe(() => {
          loadEl.dismiss();
        });
      this.form.reset();
      this.router.navigate(['/places/tabs/offers']);
    });

    console.log(this.form);

  }
}
