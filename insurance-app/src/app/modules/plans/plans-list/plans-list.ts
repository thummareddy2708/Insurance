import { Component, OnInit } from '@angular/core';
import { InsuranceService  } from '../../../services/insurance.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-plans-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './plans-list.html',
  standalone:true,
  styleUrl: './plans-list.css',
})
export class PlansList implements OnInit {
  plans: any[] = [];

  constructor(private service: InsuranceService, private router: Router ) {}

  viewPlan(id: number) {
    this.router.navigate(['/plan', id]);
  }

  ngOnInit() {
    this.service.getPlans().subscribe(data => this.plans = data);
  }
}
