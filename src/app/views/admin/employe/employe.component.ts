import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResponseData } from '../../../models/ResponseData';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '@coreui/angular';
import { EmployeService } from '../../../services/employe/employe.service';
import { Employe } from '../../../models/Employe';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss'
})
export class EmployeComponent {
  @ViewChild('updateModal') updateModal?: ModalComponent;
  @ViewChild('createModal') createModal?: ModalComponent;
  @ViewChild('deleteModal') deleteModal?: ModalComponent;
  @ViewChild('heureFinInputCreate') heureFinInputCreate?: ElementRef;
  @ViewChild('heureDebutInputCreate') heureDebutInputCreate?: ElementRef;
  @ViewChild('heureDebutInputUpdate') heureDebutInputUpdate?: ElementRef;
  @ViewChild('heureFinInputUpdate') heureFinInputUpdate?: ElementRef;
  is_loading: Boolean = false
  is_loading_activated: Boolean = false
  _id: string = ""
  nomEmploye: string = ""
  list_employe: Employe[]=[]
  createForm!: FormGroup;
  updateForm!: FormGroup;
  icons = faPlus;
  error_time_create: boolean = false
  error_time_update: boolean = false

  constructor(
    private employe: EmployeService,
    private fb: FormBuilder
  ){}

  initializeForm(): void {
    this.createForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addresse: ['', Validators.required],
      mdp: ['', Validators.required],
      heure_debut: ['', Validators.required],
      heure_fin: ['', Validators.required],
    });
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addresse: ['', Validators.required],
      mdp: ['', Validators.required],
      heure_debut: ['', Validators.required],
      heure_fin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm()
    this.is_loading = true
    this.employe.getEmploye().subscribe({
      next: (data: ResponseData<Employe[]>) => {
        this.list_employe = data.details!.map(item => ({
          _id: item._id,
          image: item.image,
          nom: item.nom,
          prenom: item.prenom,
          sexe: item.sexe,
          tel: item.tel,
          email: item.email,
          addresse: item.addresse,
          mdp: item.mdp,
          heure_debut: item.heure_debut,
          heure_fin: item.heure_fin,
          created_at: item.created_at,
          is_activated: item.is_activated
        }))
      },
      error: (err) => {
        this.is_loading = false
        console.log(err.message)
      },
      complete: () => {
        this.is_loading = false
        console.log("complete")
      }
    })
  }

  onDeleteService(id: string, nom: string){
    this._id = id
    this.nomEmploye = nom
  }

  onUpdateService(id: string){
    this._id = id
    this.employe.getEmployeById(id).subscribe({
      next: (data: ResponseData<Employe>) => {
        this.updateForm = this.fb.group({
          nom: [data.details!.nom, Validators.required],
          prenom: [data.details!.prenom, Validators.required],
          sexe: [data.details!.sexe, Validators.required],
          tel: [data.details!.tel, Validators.required],
          email: [data.details!.email, [Validators.required, Validators.email]],
          addresse: [data.details!.addresse, Validators.required],
          mdp: [data.details!.mdp, Validators.required],
          heure_debut: [data.details!.heure_debut, Validators.required],
          heure_fin: [data.details!.heure_fin, Validators.required],
        });
      },
      error: (err) => {
        console.log(err.message)
      },
      complete: () => {
        console.log("complete")
      }
    })
  }

  onDeleteSubmit(id: string){
      this.employe.deleteEmploye(id).subscribe({
        next: () => { this.deleteModal!.visible = false },
        error: (err) => console.log(err.message),
        complete: () => {
          this.is_loading = true
          this.employe.getEmploye().subscribe({
            next: (data: ResponseData<Employe[]>) => {
              this.list_employe = data.details!.map(item => ({
                _id: item._id,
                image: item.image,
                nom: item.nom,
                prenom: item.prenom,
                sexe: item.sexe,
                tel: item.tel,
                email: item.email,
                addresse: item.addresse,
                mdp: item.mdp,
                heure_debut: item.heure_debut,
                heure_fin: item.heure_fin,
                created_at: item.created_at,
                is_activated: item.is_activated
              }))
            },
            error: (err) => {
              this.is_loading = false
              console.log(err.message)
            },
            complete: () => {
              this.is_loading = false
              console.log("complete")
            }
          })
        }
        
      })
  }

  onUpdateSubmit(id: string){
    if (this.updateForm.valid) {
      this.updateModal!.visible = false
      this.employe.updateEmploye(id, this.updateForm.value).subscribe({
        next: () => {
          this.updateModal!.visible = false
        },
        error: (err) => console.log(err.message),
        complete: () => {
          this.is_loading = true
          this.employe.getEmploye().subscribe({
            next: (data: ResponseData<Employe[]>) => {
              this.list_employe = data.details!.map(item => ({
                _id: item._id,
                image: item.image,
                nom: item.nom,
                prenom: item.prenom,
                sexe: item.sexe,
                tel: item.tel,
                email: item.email,
                addresse: item.addresse,
                mdp: item.mdp,
                heure_debut: item.heure_debut,
                heure_fin: item.heure_fin,
                created_at: item.created_at,
                is_activated: item.is_activated
              }))
            },
            error: (err) => {
              this.is_loading = false
              console.log(err.message)
            },
            complete: () => {
              this.is_loading = false
              console.log("complete")
            }
          })
        }
      })
    }else{
      this.updateModal!.visible = true
      this.updateForm.markAllAsTouched();
    }
  }

  onCreateSubmit(){
    if (this.createForm.valid) {
      this.employe.createEmploye(this.createForm.value).subscribe({
        next: () => {
          this.createModal!.visible = false
        },
        error: (err) => console.log(err.message),
        complete: () => {
          this.is_loading = true
          this.employe.getEmploye().subscribe({
            next: (data: ResponseData<Employe[]>) => {
              this.list_employe = data.details!.map(item => ({
                _id: item._id,
                image: item.image,
                nom: item.nom,
                prenom: item.prenom,
                sexe: item.sexe,
                tel: item.tel,
                email: item.email,
                addresse: item.addresse,
                mdp: item.mdp,
                heure_debut: item.heure_debut,
                heure_fin: item.heure_fin,
                created_at: item.created_at,
                is_activated: item.is_activated
              }))
            },
            error: (err) => {
              this.is_loading = false
              console.log(err.message)
            },
            complete: () => {
              this.is_loading = false
              console.log("complete")
            }
          })
        }
      })
      
      // console.log(this.createForm.value);
    }else{
      this.createModal!.visible = true
      this.createForm.markAllAsTouched();
    }
    
  }
  ontoogleActifSubmit(id: string, actif: boolean){
    console.log(actif);
    
    this.is_loading_activated = true
    this.employe.updateEmployeToActivated(id, actif).subscribe({
      next: (result) => {
      },
      error: (err) => {
        this.is_loading_activated = false
        console.log(err.message)
      },
      complete: () => {
        this.is_loading_activated = false
        this.is_loading = true
        this.employe.getEmploye().subscribe({
          next: (data: ResponseData<Employe[]>) => {
            this.list_employe = data.details!.map(item => ({
              _id: item._id,
              image: item.image,
              nom: item.nom,
              prenom: item.prenom,
              sexe: item.sexe,
              tel: item.tel,
              email: item.email,
              addresse: item.addresse,
              mdp: item.mdp,
              heure_debut: item.heure_debut,
              heure_fin: item.heure_fin,
              created_at: item.created_at,
              is_activated: item.is_activated
            }))
          },
          error: (err) => {
            this.is_loading = false
            console.log(err.message)
          },
          complete: () => {
            this.is_loading = false
            console.log("complete")
          }
        })
      }
    })
  }

  onChangeCreate(){
    const heureDebutTime = new Date(`1970-01-01T${this.heureDebutInputCreate!.nativeElement.value}`);
    const heureFinTime = new Date(`1970-01-01T${this.heureFinInputCreate!.nativeElement.value}`);
    if(heureDebutTime >= heureFinTime) this.error_time_create = true;
    else this.error_time_create = false;
    
  }

  onChangeUpdate(){
    const heureDebutTime = new Date(`1970-01-01T${this.heureDebutInputUpdate!.nativeElement.value}`);
    const heureFinTime = new Date(`1970-01-01T${this.heureFinInputUpdate!.nativeElement.value}`);
    if(heureDebutTime >= heureFinTime) this.error_time_update = true;
    else this.error_time_update = false;
  }
}
