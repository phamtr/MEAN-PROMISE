import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }    from '../dashboard/dashboard.component';
import { LogincompanyComponent } from '../logincompany/logincompany.component';

const dashboardsRoutes: Routes = [
  { path: 'dashboard', redirectTo: '/dashboard' },
  { path: 'dashboard',  component: DashboardComponent,
   children: [
    {
      path: '',
      component: DashboardComponent,
      children: [
        {
          path: ':companyname',
          component: LogincompanyComponent,
          //canDeactivate: [CanDeactivateGuard],
          //resolve: {
          //  crisis: CrisisDetailResolver
          //}
        },
        {
          path: '',
          component: DashboardComponent
        }
      ]
    }
]
},
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
