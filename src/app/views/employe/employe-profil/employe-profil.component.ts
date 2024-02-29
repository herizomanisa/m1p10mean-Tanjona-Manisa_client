import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employe } from 'src/app/models/Employe';
import { ResponseData } from 'src/app/models/ResponseData';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-employe-profil',
  templateUrl: './employe-profil.component.html',
  styleUrl: './employe-profil.component.scss',
})
export class EmployeProfilComponent implements OnInit {
  isLoading: boolean = false;
  token = this.localStorageService.getData('x-authorization-e-token') || '';
  id_employe =
    this.localStorageService.getDecodedAccessToken(
      this.localStorageService.getData('x-authorization-e-token')
    )?._id || '';
  employe: Employe = {
    _id: '',
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    addresse: '',
    mdp: '',
    heure_debut: '',
    heure_fin: '',
    sexe: '',
    created_at: new Date(),
    is_activated: 0,
  };

  employeForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private employeService: EmployeService,
    private localStorageService: LocalStorageService,
    private route: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.initializeForm();
    this.initData();
  }

  initData(): void {
    this.getEmploye();
  }

  initializeForm(): void {
    this.employeForm = this.fb.group(
      {
        image: [''],
        nom: [''],
        prenom: [''],
        sexe: [''],
        tel: [''],
        email: ['', Validators.email],
        addresse: [''],
        mdp: [''],
        repeatedMdp: [''],
        heure_debut: [''],
        heure_fin: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const password = control.get('mdp')?.value;
    const repeatedPassword = control.get('repeatedMdp')?.value;
    return password === repeatedPassword ? null : { passwordMismatch: true };
  }

  checkPasswords(): void {
    const password = this.employeForm.get('mdp')?.value;
    const repeatedPassword = this.employeForm.get('repeatedMdp')?.value;
    if (password === repeatedPassword) {
      this.employeForm.setErrors(null);
    } else {
      this.employeForm.setErrors({ passwordMismatch: true });
    }
  }

  getEmploye(): void {
    this.employeService.getEmployeById(this.id_employe, this.token).subscribe({
      next: (response: ResponseData<Employe>) => {
        this.isLoading = false;
        this.employe = response.details as Employe;
        this.employeForm = this.fb.group(
          {
            image: [response.details?.image],
            nom: [response.details?.nom],
            prenom: [response.details?.prenom],
            sexe: [response.details?.sexe],
            tel: [response.details?.tel],
            email: [response.details?.email, [Validators.email]],
            addresse: [response.details?.addresse],
            mdp: [''],
            repeatedMdp: [''],
            heure_debut: [response.details?.heure_debut],
            heure_fin: [response.details?.heure_fin],
          },
          { validators: this.passwordMatchValidator }
        );
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onUpdateSubmit(): void {
    if (this.employeForm.valid) {
      const data = {
        image: this.employeForm.value.image,
        nom: this.employeForm.value.nom,
        prenom: this.employeForm.value.prenom,
        sexe: this.employeForm.value.sexe,
        tel: this.employeForm.value.tel,
        email: this.employeForm.value.email,
        addresse: this.employeForm.value.addresse,
        mdp: this.employeForm.value.mdp,
      };
      this.isLoading = true;
      this.employeService
        .updateEmploye(this.id_employe, data, this.token)
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
          },
          error: () => {
            this.toast.error('Échec de la modification', 'Erreur', {
              timeOut: 5000,
            });
            this.isLoading = false;
          },
        });
      return;
    }
    this.employeForm.markAllAsTouched();
  }
}
