import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../luci/pages/public-page/home/home.component';
import { DashboardComponent } from '../luci/pages/secure-page/dashboard/dashboard.component';
import { SystemDetailsComponent } from 'app/luci/pages/sub-page/system-details/system-details.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'global',
    children : [
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      {
        path : 'dashboard', 
        component : DashboardComponent
      },
      {
        path : 'public', 
        component : HomeComponent

      },
      {
        path : 'systemDetails', 
        component : SystemDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
