import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RendezvousStoryComponent } from './rendezvous-story.component';

const routes: Routes = [
  {
    path: '',
    component: RendezvousStoryComponent,
    data: {
      title: `Historique de rendez vous`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezvousStoryRoutingModule {}
