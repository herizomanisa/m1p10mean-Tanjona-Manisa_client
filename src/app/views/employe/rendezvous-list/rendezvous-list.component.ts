import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RendezvousClientService } from 'src/app/models/RendezvousClientService';
import { RendezvousServiceNoEmploye } from 'src/app/models/RendezvousServiceNoEmploye';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { RendezvousService } from 'src/app/services/rendezvous/rendezvous.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Service } from 'src/app/models/Service';
import { Customer } from 'src/app/models/Customer';
import { ToastrService } from 'ngx-toastr';

interface RendezvousInterface {
  _id: string;
  id_customer: string;
  id_service: string;
  date_heure: Date;
  is_valid: number;
  created_at: Date;
  service: Service;
  customer: Customer;
}

@Component({
  selector: 'app-rendezvous-list',
  templateUrl: './rendezvous-list.component.html',
  styleUrl: './rendezvous-list.component.scss',
})
export class RendezvousListComponent implements OnInit {
  isLoading: boolean = false;
  token = this.localStorageService.getData('x-authorization-e-token') || '';
  listRendezvous: RendezvousInterface[] = [];
  listRendezvousNoEmploye: RendezvousInterface[] = [];

  drop(event: CdkDragDrop<RendezvousInterface[]>) {
    let selectedItem: RendezvousInterface;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      selectedItem = event.container.data[event.currentIndex];
      this.onValidateRendezvousNoemploye(selectedItem._id);
    }
  }

  constructor(
    private rendezvousService: RendezvousService,
    private employeService: EmployeService,
    private localStorageService: LocalStorageService,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.isLoading = true;
    this.fetchListRendezVousEmploye();
    this.fetchListRendezVousNoEmploye();
  }

  fetchListRendezVousEmploye(): void {
    try {
      this.employeService.getRendezvousUpToDate(this.token).subscribe({
        next: (response) => {
          this.listRendezvous = response.details.map(
            (rdv: RendezvousClientService) => {
              return {
                _id: rdv._id,
                id_customer: rdv.id_customer._id,
                id_service: rdv.id_service._id,
                date_heure: rdv.date_heure,
                is_valid: rdv.is_valid,
                created_at: rdv.created_at,
                service: rdv.id_service,
                customer: rdv.id_customer,
              };
            }
          );
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

  fetchListRendezVousNoEmploye(): void {
    try {
      this.rendezvousService
        .getRendezvousNoEmployeUpToDate(this.token)
        .subscribe({
          next: (response) => {
            this.listRendezvousNoEmploye = response.details.map(
              (rdv: RendezvousServiceNoEmploye) => {
                return {
                  _id: rdv._id,
                  id_customer: rdv.id_customer,
                  id_service: rdv.id_service,
                  date_heure: rdv.date_heure,
                  is_valid: rdv.is_valid,
                  created_at: rdv.created_at,
                  service: rdv.services,
                  customer: rdv.customers,
                };
              }
            );
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

  onValidateRendezvous(id_rendezvous: string): void {
    this.isLoading = true;
    this.employeService
      .validateRendezvous(id_rendezvous, this.token)
      .subscribe({
        next: () => {
          this.toast.success('Validation effectuée avec succès', 'Succès', {
            timeOut: 5000,
          });
          this.isLoading = false;
          this.initData();
        },
        error: () => {
          this.toast.error('Échec de la validation', 'Erreur', {
            timeOut: 5000,
          });
          this.isLoading = false;
        },
      });
  }

  onValidateRendezvousNoemploye(id_rendezvous: string): void {
    this.isLoading = true;
    this.employeService
      .acceptRdvNoEmploye({ id_rendezvous }, this.token)
      .subscribe({
        next: () => {
          this.toast.success(
            'Vos modifications ont été effectuées avec succès',
            'Succès',
            {
              timeOut: 5000,
            }
          );
          this.isLoading = false;
          this.initData();
        },
        error: () => {
          this.toast.error('Échec de la modification', 'Erreur', {
            timeOut: 5000,
          });
          this.isLoading = false;
        },
      });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'd MMM y H:mm') || '';
  }
}
