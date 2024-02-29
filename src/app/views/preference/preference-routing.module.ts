import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicePreferenceComponent } from './service-preference/service-preference.component';
import { EmployePreferenceComponent } from './employe-preference/employe-preference.component';

const routes: Routes = [
  {
    path: 'service',
    component: ServicePreferenceComponent,
    data: {
      title: 'Service Preference',
    },
  },
  {
    path: 'employe',
    component: EmployePreferenceComponent,
    data: {
      title: 'Employe Preference',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferenceRoutingModule {}
