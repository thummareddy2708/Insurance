import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { InsuranceService  } from '../../../services/insurance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './plan-details.html',
  standalone:true,
  styleUrl: './plan-details.css',
})
export class PlanDetails  implements OnInit {
  plan: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private service: InsuranceService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Route ID:", id);

    this.service.getPlan(id).subscribe({
      next: (data) => {
        console.log("Plan Data:", data);
        this.plan = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading plan", err);
        alert("Failed to load plan data!");
        this.loading = false;
      }
    });
  }

  buy() {
    localStorage.setItem("selectedPlan", JSON.stringify(this.plan));
    this.router.navigate(['/buy']);
  }
}