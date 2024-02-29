import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/Service';
import { Employe } from 'src/app/models/Employe';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { RendezvousService } from 'src/app/services/rendezvous/rendezvous.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rendezvous-form',
  templateUrl: './rendezvous-form.component.html',
  styleUrl: './rendezvous-form.component.scss',
})
export class RendezvousFormComponent implements OnInit {
  isLoading: boolean = false;
  listEmploye: Employe[] = [];
  listService: Service[] = [];
  token = this.localStorageService.getData('x-authorization-c-token') || '';

  rendezvousForm!: FormGroup;
  errorMessage: string | undefined;

  id_service: string = '';
  id_employe: string = '';

  constructor(
    private serviceService: ServiceService,
    private localStorageService: LocalStorageService,
    private employeService: EmployeService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private rendezvousService: RendezvousService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.id_service = params.get('id_service') || '';
      this.id_employe = params.get('id_employe') || '';
      this.initializeForm(this.id_service, this.id_employe);
    });
  }

  currentOrFutureDateValidator(control: FormControl) {
    const now = new Date();
    const controlValue = new Date(control.value);
    return controlValue >= now ? null : { currentOrFutureDate: true };
  }

  checkDateHeure(): void {
    const now = new Date();
    const controlValue = new Date(this.rendezvousForm.get('date_heure')?.value);
    if (controlValue >= now) {
      this.rendezvousForm.setErrors(null);
    } else {
      this.rendezvousForm.setErrors({ currentOrFutureDate: true });
    }
  }

  initializeForm(id_service: string, id_employe: string): void {
    this.rendezvousForm = this.fb.group({
      id_service: [id_service, Validators.required],
      id_employe: [id_employe],
      date_heure: [
        '',
        [Validators.required, this.currentOrFutureDateValidator],
      ],
    });
  }

  initData(): void {
    this.fetchListEmploye();
    this.fetchListService();
  }

  fetchListEmploye(): void {
    this.isLoading = true;
    try {
      if (!this.token) return;
      this.employeService.getEmployeActif(this.token).subscribe({
        next: (response) => {
          this.listEmploye = response.details;
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

  fetchListService(): void {
    this.isLoading = true;
    try {
      this.serviceService.getServiceActif().subscribe({
        next: (response) => {
          this.listService = response.details;
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

  async onSubmitRendezvousForm() {
    if (this.rendezvousForm.valid) {
      if (this.rendezvousForm.value.id_employe) {
        const data = {
          id_service: this.rendezvousForm.value.id_service,
          id_employe: this.rendezvousForm.value.id_employe,
          date_heure: new Date(this.rendezvousForm.value.date_heure),
        };
        this.isLoading = true;
        this.rendezvousService.createRendezvous(data, this.token).subscribe({
          next: () => {
            this.toast.success(
              'Votre demande a été remise avec succès',
              'Succès',
              {
                timeOut: 5000,
              }
            );
            this.isLoading = false;
          },
          error: () => {
            this.toast.error('Échec de la demande', 'Erreur', {
              timeOut: 5000,
            });
            this.isLoading = false;
          },
        });
        return;
      } else {
        const data = {
          id_service: this.rendezvousForm.value.id_service,
          date_heure: new Date(this.rendezvousForm.value.date_heure),
        };
        this.isLoading = true;
        this.rendezvousService
          .createRendezvousNoEmploye(data, this.token)
          .subscribe({
            next: () => {
              this.toast.success(
                'Votre demande a été remise avec succès',
                'Succès',
                {
                  timeOut: 5000,
                }
              );
              this.isLoading = false;
            },
            error: () => {
              this.toast.error('Échec de la demande', 'Erreur', {
                timeOut: 5000,
              });
              this.isLoading = false;
            },
          });
        return;
      }
    }
    this.rendezvousForm.markAllAsTouched();
  }
}
