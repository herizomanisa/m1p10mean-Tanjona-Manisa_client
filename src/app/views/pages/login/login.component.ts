import { Component , OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ManagerService} from '../../../services/manager/manager.service';
import { ResponseData } from '../../../models/ResponseData';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder, 
    private managerService: ManagerService,
    private route: Router,
    private toast: ToastrService
  ) { }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      nom: ['admin5', Validators.required],
      mdp: ['admin5', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  async onLoginSubmit(){
    if (this.loginForm.valid) {
      const token = await this.managerService.login(this.loginForm.value.nom, this.loginForm.value.mdp)
      token.subscribe({
        next: (result: ResponseData<String>) =>{
            const rep: string= result.details as string;
            if(rep !== null) {
              localStorage.setItem('x-authorization-m-token', rep);
              this.route.navigate(['/dashboard']);
              // route.parseUrl('/dashboard');
              return;
            }
            this.toast.error('Username or password incorrect','Error',{
              timeOut: 2000,
            })
            // route.navigate(['/login']);
          },
        error: (err) => {
          this.errorMessage = "Identifiant ou mot de passe incorrect";
          console.error(err);
        },
        complete: () => console.log('complete')
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}