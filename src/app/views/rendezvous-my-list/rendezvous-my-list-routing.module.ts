import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RendezvousMyListComponent } from './rendezvous-my-list.component';

const routes: Routes = [
  {
    path: '',
    component: RendezvousMyListComponent,
    data: {
      title: `Mes rendez vous`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezvousMyListRoutingModule {}
