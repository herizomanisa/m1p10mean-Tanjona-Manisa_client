import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeProfilComponent } from './employe-profil/employe-profil.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeProfilComponent,
    data: {
      title: "Profil Employé"
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeRoutingModule {}
