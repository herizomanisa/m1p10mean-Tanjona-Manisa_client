import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { RendezvousListComponent } from './rendezvous-list/rendezvous-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [EmployeProfilComponent, RendezvousListComponent],
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
    DragDropModule
  ],
  providers: [DatePipe]
})
export class EmployeModule {}
