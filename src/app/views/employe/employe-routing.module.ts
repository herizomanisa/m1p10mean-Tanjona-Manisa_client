import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeProfilComponent } from './employe-profil/employe-profil.component';
import { RendezvousListComponent } from './rendezvous-list/rendezvous-list.component';

const routes: Routes = [
  {
    path: 'profil',
    component: EmployeProfilComponent,
    data: {
      title: 'Profil Employé',
    },
  },
  {
    path: '',
    component: RendezvousListComponent,
    data: {
      title: 'Rendezvous List',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeRoutingModule {}
