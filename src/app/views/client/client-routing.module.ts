import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffreComponent } from './offre/offre.component';

const routes: Routes = [
  {
    path: 'notification',
    component: OffreComponent,
    data: {
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
