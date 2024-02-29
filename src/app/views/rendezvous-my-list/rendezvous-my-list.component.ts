import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RendezvousServiceEmploye } from 'src/app/models/RendezvousServiceEmploye';
import { ClientService } from 'src/app/services/client/client.service';
import { RendezvousService } from 'src/app/services/rendezvous/rendezvous.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rendezvous-my-list',
  templateUrl: './rendezvous-my-list.component.html',
  styleUrl: './rendezvous-my-list.component.scss',
})
export class RendezvousMyListComponent implements OnInit {
  icons = { faCheck, faExclamationTriangle };

  isLoading: boolean = false;
  listRendezvous: RendezvousServiceEmploye[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private route: Router,
    private rendezvousService: RendezvousService,
    private clientService: ClientService,
    private datePipe: DatePipe,
    private toast: ToastrService
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
      this.clientService.getNotPaid().subscribe({
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

  onPaymentSubmit(id_rendezvous: string): void {
    this.isLoading = true;
    this.clientService
      .payment(
        { id_rendezvous },
        this.localStorageService.getData('x-authorization-c-token') || ''
      )
      .subscribe({
        next: () => {
          this.toast.success('Paiement effectué avec succès', 'Succès', {
            timeOut: 5000,
          });
          this.isLoading = false;
          this.initData();
        },
        error: () => {
          this.toast.error('Échec du paiement', 'Erreur', {
            timeOut: 5000,
          });
          this.isLoading = false;
        },
      });
    return;
  }
}
