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

import { RendezvousFormComponent } from './rendezvous-form.component';
import { RendezvousFormRoutingModule } from './rendezvous-form-routing.module';

@NgModule({
  declarations: [RendezvousFormComponent],
  imports: [
    CommonModule,
    CardModule,
    NavModule,
    IconModule,
    GridModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    SpinnerModule,
    FontAwesomeModule,
    RendezvousFormRoutingModule,
  ],
})
export class RendezvousFormModule {}
