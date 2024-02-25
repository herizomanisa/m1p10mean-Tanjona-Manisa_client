import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ManagerService} from '../../../services/manager/manager.service';
import { ResponseData } from '../../../models/ResponseData';

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
    private managerService: ManagerService
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
            console.log(result.details)
            const rep: string= result.details as string;
            if(rep !== null) {
              localStorage.setItem('x-authorization-token', rep);
              return;
            }
            console.log('mbol madn')
          },
        error: (err) => {
          this.errorMessage = "Identifiant ou mot de passe incorrect";
          console.error(err);
        },
        complete: () => console.log('complete')
      }
        // (result: ResponseData<String>) =>{
        //   // console.log(result.details)
        //   const rep: string= result.details as string;
        //   localStorage.setItem('x-authorization-token', rep);
        // }
        // ()
      )
      console.log(this.loginForm.value.nom);
      // if(token)
      // console.log(this.loginForm.value.nom);
      // localStorage.setItem('x-authorization-token', token);
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}