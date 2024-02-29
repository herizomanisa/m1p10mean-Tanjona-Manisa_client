import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  SpinnerModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ResponseData } from 'src/app/models/ResponseData';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-employe-login',
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
  templateUrl: './employe-login.component.html',
  styleUrl: './employe-login.component.scss',
})
export class EmployeLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | undefined;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeService: EmployeService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) {}

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['koto@yopmail.com', [Validators.required, Validators.email]],
      mdp: ['1234', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  async onLoginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const token = await this.employeService.login(
        this.loginForm.value.email,
        this.loginForm.value.mdp
      );
      token.subscribe({
        next: (result: ResponseData<String>) => {
          this.isLoading = false;
          const rep: string = result.details as string;
          if (rep !== null) {
            this.localStorageService.saveData('x-authorization-e-token', rep);
            this.route.navigate(['/employe']);
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
      this.isLoading = false;
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToLoginClient(): void{
    this.route.navigate(['/client/login']);
  }

  goToLoginManager(): void{
    this.route.navigate(['/login']);
  }
}
