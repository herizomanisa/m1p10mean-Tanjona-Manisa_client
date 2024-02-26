import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/models/ResponseData';
import { ClientService } from 'src/app/services/client/client.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { Customer } from '../../../models/Customer';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss'],
})
export class ClientRegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string | undefined;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) {}

  passwordMatchValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const password = control.get('mdp')?.value;
    const repeatedPassword = control.get('repeatedMdp')?.value;
    return password === repeatedPassword ? null : { passwordMismatch: true };
  }

  checkPasswords(): void {
    const password = this.registerForm.get('mdp')?.value;
    const repeatedPassword = this.registerForm.get('repeatedMdp')?.value;
    if (password === repeatedPassword) {
      this.registerForm.setErrors(null);
    } else {
      this.registerForm.setErrors({ passwordMismatch: true });
    }
  }

  initializeForm(): void {
    this.registerForm = this.fb.group(
      {
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        tel: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        addresse: [''],
        mdp: ['', Validators.required],
        repeatedMdp: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  async onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.clientService
        .register({
          image: null,
          nom: this.registerForm.value.nom,
          prenom: this.registerForm.value.prenom,
          tel: this.registerForm.value.tel,
          email: this.registerForm.value.email,
          addresse: this.registerForm.value.addresse,
          mdp: this.registerForm.value.mdp,
        })
        .subscribe({
          next: (
            result: ResponseData<{ customer: Customer; token: string }>
          ) => {
            this.isLoading = false;
            const token = result.details?.token as string;
            this.localStorageService.saveData('x-authorization-c-token', token);
            this.route.navigate(['/']);
            return;
          },
          error: (err: ResponseData<any>) => {
            this.isLoading = false;
            this.errorMessage = err.message;
            console.error(err);
          },
          complete: () => console.log('complete'),
        });
      this.isLoading = false;
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  goToLogin(): void {
    this.route.navigate(['/client/login']);
  }
}
