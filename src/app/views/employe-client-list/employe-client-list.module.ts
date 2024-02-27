import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  SpinnerModule,
  TableModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EmployeClientListComponent } from './employe-client-list.component';
import { EmployeClientListRoutingModule } from './employe-client-list-routing.component';

@NgModule({
  declarations: [EmployeClientListComponent],
  imports: [
    CommonModule,
    CardModule,
    NavModule,
    IconModule,
    GridModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    EmployeClientListRoutingModule,
    SpinnerModule,
    FontAwesomeModule,
  ],
})
export class EmployeClientListModule {}
