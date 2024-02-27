import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RendezvousFormComponent } from './rendezvous-form.component';

const routes: Routes = [
  {
    path: '',
    component: RendezvousFormComponent,
    data: {
      title: `Formulaire de rendez vous`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezvousFormRoutingModule {}
