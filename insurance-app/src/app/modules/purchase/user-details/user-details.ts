import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-details.html',
  standalone:true,
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {

  form!: FormGroup;
  submitted = false;
  plan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      // ✅ Phone & Age validated on submit only
      phone: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  next() {
    this.submitted = true;

    // ✅ Manually validate phone & age on submit
    const phoneValid = /^[0-9]{10}$/.test(this.form.value.phone);
    const ageValid = this.form.value.age >= 18 && this.form.value.age <= 80;

    if (!phoneValid) {
      this.form.get('phone')?.setErrors({ invalidPhone: true });
    }
    if (!ageValid) {
      this.form.get('age')?.setErrors({ invalidAge: true });
    }

    // ✅ Stop if any validation fails
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    localStorage.setItem("customer", JSON.stringify(this.form.value));
    this.router.navigate(['/payment']);
  }
  
}