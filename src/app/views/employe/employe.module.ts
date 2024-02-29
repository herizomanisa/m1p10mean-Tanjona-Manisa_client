import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

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

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeRoutingModule } from './employe-routing.module';

import { EmployeProfilComponent } from './employe-profil/employe-profil.component';

@NgModule({
  declarations: [EmployeProfilComponent],
  imports: [
    CommonModule,
    CardModule,
    NavModule,
    IconModule,
    GridModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    EmployeRoutingModule,
    SpinnerModule,
    FontAwesomeModule,
  ],
})
export class EmployeModule {}
