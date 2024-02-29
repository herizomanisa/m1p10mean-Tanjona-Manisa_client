import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OffreService } from '../../../services/offre/offre.service';
import { Offre } from '../../../models/Offre';
import { Customer } from '../../../models/Customer';
import { Service } from '../../../models/Service';
import { ResponseData } from '../../../models/ResponseData';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus, fas } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '@coreui/angular';
import { ClientService } from '../../../services/client/client.service';
import { ServiceService } from '../../../services/service/service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.scss'
})
export class OffreComponent implements OnInit{
  @ViewChild('updateModal') updateModal?: ModalComponent;
  @ViewChild('deleteModal') deleteModal?: ModalComponent;
  @ViewChild('nomCustomerSearch') nomCustomerSearch?: ElementRef;
  @ViewChild('emailCustomerSearch') emailCustomerSearch?: ElementRef;
  @ViewChild('nomServiceSearch') nomServiceSearch?: ElementRef;
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-m-token'));
  is_loading: Boolean = false
  is_loading_creation: boolean = false
  is_error_creation: boolean = false
  error_date: boolean = false
  is_offer_exist: boolean = false
  _id: string = ""
  nomEmploye: string = ""
  list_offre: Offre[]=[]
  createForm!: FormGroup;
  updateForm!: FormGroup;
  list_customer: Customer[] = []
  list_service: Service[] = []
  customer_choisi = {
    id:'',
    nom:''
  }
  service_choisi = {
    id:'',
    nom:''
  }

  constructor(
    private service: OffreService,
    private customerService: ClientService,
    private ServiceService: ServiceService,
    private fb: FormBuilder
  ){}

    // Function to format date to yyyy-MM-ddTHH:mm format
    private formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = this.padNumber(date.getMonth() + 1);
      const day = this.padNumber(date.getDate());
      const hours = this.padNumber(date.getHours());
      const minutes = this.padNumber(date.getMinutes());
  
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  
    // Function to pad a number with leading zero if necessary
    private padNumber(n: number): string {
      return n < 10 ? '0' + n : '' + n;
    }
  

  initializeForm(): void {
    this.createForm = this.fb.group({
      id_customer: ['', Validators.required],
      id_service: ['', Validators.required],
      reduction: ['', Validators.required],
      date_heure_fin: ['', Validators.required]
    });
    this.updateForm = this.fb.group({
      customer: ['', Validators.required],
      service: ['', Validators.required],
      reduction: ['', Validators.required],
      date_heure_fin: ['', Validators.required]
    });
  }

  initializeData(): void{
    this.customerService.searchByName('','').subscribe({
      next: (data: ResponseData<Customer[]>) => {
        this.list_customer = data.details!.map(item => ({
          _id: item._id,
          image: item.image,
          nom: item.nom,
          prenom: item.prenom,
          tel: item.tel,
          email: item.email,
          addresse: item.addresse,
          mdp: item.mdp,
          created_at: item.created_at,
          sexe: item.sexe
        }))
      },
      error: () => {},
      complete: () => {}
    })

    this.ServiceService.searchByName('').subscribe({
      next: (data: ResponseData<Service[]>) => {
        this.list_service = data.details!.map(item => ({
          _id: item._id,
          nom: item.nom,
          prix: item.prix,
          duree: item.duree,
          commission: item.commission,
          is_activated: item.is_activated,
          created_at: item.created_at
        }))
      },
      error: () => {},
      complete: () => {}
    })
  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeData()
    this.is_loading = true
    this.service.getOffreUptodate(this.headers).subscribe({
      next: (data: ResponseData<Offre[]>) => {
        this.list_offre = data.details!.map(item => ({
          _id: item._id,
          id_customer: item.id_customer,
          id_service: item.id_service,
          reduction: item.reduction,
          date_heure_fin: item.date_heure_fin,
          created_at: item.created_at
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
    this.service.getOffreById(this.headers, id).subscribe({
      next: (data: ResponseData<Offre>) => {
        console.log(data)
        this.updateForm = this.fb.group({
          customer: [{value: data.details!.id_customer.nom, disabled: true}, Validators.required],
          service: [{value: data.details!.id_service.nom, disabled: true}, Validators.required],
          reduction: [data.details!.reduction, Validators.required],
          date_heure_fin: [this.formatDate(new Date(data.details!.date_heure_fin)), Validators.required]
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
      this.service.deleteOffre(this.headers, id).subscribe({
        next: () => { this.deleteModal!.visible = false },
        error: (err) => console.log(err.message),
        complete: () => {
          this.is_loading = true
          this.service.getOffreUptodate(this.headers).subscribe({
            next: (data: ResponseData<Offre[]>) => {
              this.list_offre = data.details!.map(item => ({
                _id: item._id,
                id_customer: item.id_customer,
                id_service: item.id_service,
                reduction: item.reduction,
                date_heure_fin: item.date_heure_fin,
                created_at: item.created_at
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
      this.service.updateOffre(this.headers, id, this.updateForm.value).subscribe({
        next: () => {
          this.updateModal!.visible = false
        },
        error: (err) => console.log(err.message),
        complete: () => {
          this.is_loading = true
          this.service.getOffreUptodate(this.headers).subscribe({
            next: (data: ResponseData<Offre[]>) => {
              this.list_offre = data.details!.map(item => ({
                _id: item._id,
                id_customer: item.id_customer,
                id_service: item.id_service,
                reduction: item.reduction,
                date_heure_fin: item.date_heure_fin,
                created_at: item.created_at
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

  onChangeCustomer(){
    this.customerService.searchByName(this.nomCustomerSearch!.nativeElement.value,
      this.emailCustomerSearch!.nativeElement.value).subscribe({
      next: (data: ResponseData<Customer[]>) => {
        this.list_customer = data.details!.map(item => ({
          _id: item._id,
          image: item.image,
          nom: item.nom,
          prenom: item.prenom,
          tel: item.tel,
          email: item.email,
          addresse: item.addresse,
          mdp: item.mdp,
          created_at: item.created_at,
          sexe: item.sexe
        }))
      },
      error: () => {},
      complete: () => {}
    })
  }

  onChangeService(){
    this.ServiceService.searchByName(this.nomServiceSearch!.nativeElement.value).subscribe({
      next: (data: ResponseData<Service[]>) => {
        this.list_service = data.details!.map(item => ({
          _id: item._id,
          nom: item.nom,
          prix: item.prix,
          duree: item.duree,
          commission: item.commission,
          is_activated: item.is_activated,
          created_at: item.created_at
        }))
      },
      error: () => {},
      complete: () => {}
    })
  }

  onCreateSubmit(id_customer: string, id_service: string){
    if(id_customer !== '' && id_service !== ''){
      if (this.createForm.valid) {
        if(new Date(this.createForm.value.date_heure_fin) <= new Date()) this.error_date = true
        this.is_error_creation = false
        this.is_loading_creation = true
        this.service.createOffre(this.headers, this.createForm.value).subscribe({
          next: (result) => {
            this.is_offer_exist = false
            if(result.details.code === 'offer_exist'){
              this.is_offer_exist = true
            }
          },
          error: (err) => {
            this.is_loading_creation = false
            console.log(err.message)
          },
          complete: () => {
            this.is_loading_creation = false
            this.is_loading = true
            this.service.getOffreUptodate(this.headers).subscribe({
              next: (data: ResponseData<Offre[]>) => {
                this.list_offre = data.details!.map(item => ({
                  _id: item._id,
                  id_customer: item.id_customer,
                  id_service: item.id_service,
                  reduction: item.reduction,
                  date_heure_fin: item.date_heure_fin,
                  created_at: item.created_at
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
        this.error_date = false
        this.createForm.markAllAsTouched();
      }
    }else{
      this.is_error_creation = true
    }
  }

  onClickTableCustomer(id: string, nom: string){
    this.customer_choisi = {id: id, nom: nom}
    this.createForm = this.fb.group({
      id_customer: [this.customer_choisi.id, Validators.required],
      id_service: [this.service_choisi.id, Validators.required],
      reduction: ['', Validators.required],
      date_heure_fin: ['', Validators.required]
    });
  }

  onClickTableService(id: string, nom: string){
    this.service_choisi = {id: id, nom: nom}
    this.createForm = this.fb.group({
      id_customer: [this.customer_choisi.id, Validators.required],
      id_service: [this.service_choisi.id, Validators.required],
      reduction: ['', Validators.required],
      date_heure_fin: ['', Validators.required]
    });
  }
}
