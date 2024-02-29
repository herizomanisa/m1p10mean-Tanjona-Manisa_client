import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RendezvousMyListRoutingModule } from './rendezvous-my-list-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import {
  AlertModule,
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
import { RendezvousMyListComponent } from './rendezvous-my-list.component';

@NgModule({
  declarations: [RendezvousMyListComponent],
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
    AlertModule,
    RendezvousMyListRoutingModule,
  ],
  providers: [DatePipe]
})
export class RendezvousMyListModule {}
