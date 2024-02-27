import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeClientListComponent } from './employe-client-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeClientListComponent,
    data: {
      title: `Liste des employés`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeClientListRoutingModule {}
