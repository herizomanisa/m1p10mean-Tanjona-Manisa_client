import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RendezvousStoryRoutingModule } from './rendezvous-story-routing.module';

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
import { RendezvousStoryComponent } from './rendezvous-story.component';

@NgModule({
  declarations: [RendezvousStoryComponent],
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
    RendezvousStoryRoutingModule,
  ],
  providers: [DatePipe]
})
export class RendezvousStoryModule {}
