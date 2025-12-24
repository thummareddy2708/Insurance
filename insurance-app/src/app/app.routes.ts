import { Routes } from '@angular/router';
import { PlansList } from './modules/plans/plans-list/plans-list';
import { PlanDetails } from './modules/plans/plan-details/plan-details';
import { About } from './modules/about/about';
import { UserDetails } from './modules/purchase/user-details/user-details';
import { Payment } from './modules/purchase/payment/payment';
import { Home } from './modules/home/home';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'plans', component: PlansList },
  { path: 'plan/:id', component: PlanDetails },
  { path: 'about', component: About },
  { path: 'buy', component: UserDetails },
  { path: 'payment', component: Payment }
];
