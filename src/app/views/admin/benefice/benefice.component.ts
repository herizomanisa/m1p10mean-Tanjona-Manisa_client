import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../../services/manager/manager.service';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-benefice',
  templateUrl: './benefice.component.html',
  styleUrl: './benefice.component.scss'
})
export class BeneficeComponent implements OnInit{
  calculForm!: FormGroup;
  salaire: number = 0
  paiement: number = 0
  annee: number = new Date().getFullYear()
  valeur: number = 0
  is_loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService
  ){}

  initializeForm(): void {
    this.calculForm = this.fb.group({
      mois: [new Date().getMonth()+1, Validators.required],
      loyer: [0],
      piece: [0],
      autre: [0]
    });
  }

  ngOnInit(): void {
      this.initializeForm();
      this.managerService.getCalcul_CA(new Date().getMonth()+1, 0, 0, 0).subscribe({
        next:(result) => {
          this.salaire = result.details.salaire
          this.paiement = result.details.payment
          this.valeur = result.details.CA
        },
        error:(err) => console.log(err.message),
        complete:() => console.log()
      })
  }

  onCalculSubmit(){
    console.log(this.calculForm.value)
    this.is_loading = true
    this.managerService.getCalcul_CA(this.calculForm.value.mois, this.calculForm.value.loyer,
      this.calculForm.value.piece, this.calculForm.value.autre).subscribe({
      next:(result) => {
        this.salaire = result.details.salaire
        this.paiement = result.details.payment
        this.valeur = result.details.CA
        this.is_loading = false
      },
      error:(err) => {
        this.is_loading = false
        console.log(err.message)
      },
      complete:() => {
        this.is_loading = false
        console.log()
      }
    })
  }
}
