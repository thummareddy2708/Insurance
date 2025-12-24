import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceService } from '../../../services/insurance.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.html',
  styleUrl: './payment.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class Payment implements OnInit {

  plan: any;
  form!: FormGroup;
  submitted = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private service: InsuranceService,
    private router: Router
  ) {}

  ngOnInit() {

    // ✅ Get selected plan from localStorage or route
    this.plan = JSON.parse(localStorage.getItem('selectedPlan') || 'null');

    this.form = this.fb.group({
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]]
    });
  }

  pay() {
    this.submitted = true;
    if (this.form.invalid) return;
  
    const maskedCard = '**** **** **** ' + this.form.value.cardNumber.slice(-4);
  
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
    const plan = this.plan;
  
    // ✅ Prepare final booking object
    const bookingData = {
      name: customer.name,
      city: customer.city,
      phone: customer.phone,
      email: customer.email,
      age: customer.age,
      planId: plan.id,
      planName: plan.planName,
      validity: plan.validity,
      paymentMode: "Credit Card",
      cardNumber: maskedCard,
      premiumAmt: plan.baseAmt,
      paymentFreq: "Yearly",         // you can change/dropdown later
      paymentDate: new Date().toISOString(),
    };
  
    // ✅ Save to backend JSON server
    this.service.saveBooking(bookingData).subscribe(() => {
  
      // Save masked only to browser history if needed
      localStorage.setItem('payment', JSON.stringify({
        cardName: this.form.value.cardName,
        cardNumber: maskedCard,
        expiry: this.form.value.expiry,
        premiumAmount: plan.baseAmt,
        planName: plan.planName,
        paymentDate: new Date().toISOString()
      }));
  
      this.success = true;
  
      // ❗optional: clear customer form from storage
      // localStorage.removeItem('customer');
    });
  }
  
  
}
