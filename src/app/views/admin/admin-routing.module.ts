import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceComponent } from './service/service.component';
import { EmployeComponent } from './employe/employe.component';
import { BeneficeComponent } from './benefice/benefice.component';
import { OffreComponent } from './offre/offre.component';

const routes: Routes = [
  {
    path: 'service',
    component: ServiceComponent,
    data: {
    }
  },
  {
    path: 'employe',
    component: EmployeComponent,
    data: {
    }
  },
  {
    path: 'benefice',
    component: BeneficeComponent,
    data: {
    }
  },
  {
    path: 'offre',
    component: OffreComponent,
    data: {
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
