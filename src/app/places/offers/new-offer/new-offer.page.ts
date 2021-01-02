import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

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
    console.log(this.form);

  }
}
