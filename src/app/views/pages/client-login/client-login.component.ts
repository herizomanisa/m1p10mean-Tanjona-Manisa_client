import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client/client.service';
import { LocalStorageService } from '../../../services/storage/local-storage.service';
import { ResponseData } from '../../../models/ResponseData';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  SpinnerModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    SpinnerModule,
  ],
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.scss',
})
export class ClientLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | undefined;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) {}

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['kila@yopmail.com', [Validators.required, Validators.email]],
      mdp: ['1234', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.clientService
        .login(this.loginForm.value.email, this.loginForm.value.mdp)
        .subscribe({
          next: (result: ResponseData<String>) => {
            this.isLoading = false;
            const rep: string = result.details as string;
            if (rep !== null) {
              this.localStorageService.saveData('x-authorization-c-token', rep);
              this.route.navigate(['/']);
              return;
            }
            this.errorMessage = 'Identifiant ou mot de passe incorrect';
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Identifiant ou mot de passe incorrect';
            console.error(err);
          },
          complete: () => console.log('complete'),
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegister(): void {
    this.route.navigate(['/client/register']);
  }
}
