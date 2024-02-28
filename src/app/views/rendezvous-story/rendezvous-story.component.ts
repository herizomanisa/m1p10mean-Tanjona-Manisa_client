import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rendezvoustracking } from 'src/app/models/Rendezvoustracking';
import { ClientService } from 'src/app/services/client/client.service';
import { RendezvousService } from 'src/app/services/rendezvous/rendezvous.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rendezvous-story',
  templateUrl: './rendezvous-story.component.html',
  styleUrl: './rendezvous-story.component.scss',
})
export class RendezvousStoryComponent implements OnInit {
  icons = { faCheck, faExclamationTriangle };

  isLoading: boolean = false;
  listRendezvous: Rendezvoustracking[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private route: Router,
    private rendezvousService: RendezvousService,
    private clientService: ClientService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.fetchListRendezvous();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'EEEE d MMM y H:mm') || '';
  }

  fetchListRendezvous(): void {
    this.isLoading = true;
    try {
      this.clientService.getHistoryRendezvous().subscribe({
        next: (response) => {
          this.listRendezvous = response.details;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
