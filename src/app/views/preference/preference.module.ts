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
import { PreferenceRoutingModule } from './preference-routing.module';

import { ServicePreferenceComponent } from './service-preference/service-preference.component';
import { EmployePreferenceComponent } from './employe-preference/employe-preference.component';

@NgModule({
  declarations: [ServicePreferenceComponent, EmployePreferenceComponent],
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
    PreferenceRoutingModule,
    SpinnerModule,
    FontAwesomeModule,
  ],
})
export class PreferenceModule {}
