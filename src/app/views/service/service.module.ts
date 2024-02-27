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

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    CardModule,
    NavModule,
    IconModule,
    CommonModule,
    GridModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    ServiceRoutingModule,
    SpinnerModule,
    FontAwesomeModule 
  ],
})
export class ServiceModule {}
