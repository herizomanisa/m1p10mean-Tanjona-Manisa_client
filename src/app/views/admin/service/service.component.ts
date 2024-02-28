import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service';
import { Service } from '../../../models/Service';
import { ResponseData } from '../../../models/ResponseData';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '@coreui/angular';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit{
  @ViewChild('updateModal') updateModal?: ModalComponent;
  @ViewChild('createModal') createModal?: ModalComponent;
  @ViewChild('deleteModal') deleteModal?: ModalComponent;
  is_loading: Boolean = false
  _id: string = ""
  nomService: string = ""
  list_service: Service[]=[]
  createForm!: FormGroup;
  updateForm!: FormGroup;
  icons = faPlus;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ){}

  initializeForm(): void {
    this.createForm = this.fb.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
      duree: ['', Validators.required],
      commission: ['', Validators.required]
    });
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
      duree: ['', Validators.required],
      commission: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeForm()
    this.service.getService().subscribe({
      next: (data: ResponseData<Service[]>) => {
        this.is_loading = true
        this.list_service = data.details!.map(item => ({
          _id: item._id,
          nom: item.nom,
          prix: item.prix,
          duree: item.duree,
          commission: item.commission,
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
    this.nomService = nom
  }

  onUpdateService(id: string){
    this._id = id
    this.service.getServiceById(id).subscribe({
      next: (data: ResponseData<Service>) => {
        this.updateForm = this.fb.group({
          nom: [data.details!.nom, Validators.required],
          prix: [data.details!.prix, Validators.required],
          duree: [data.details!.duree, Validators.required],
          commission: [data.details!.commission, Validators.required]
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
      this.service.deleteService(id).subscribe({
        next: () => { this.deleteModal!.visible = false },
        error: (err) => console.log(err.message),
        complete: () => {
          this.service.getService().subscribe({
            next: (data: ResponseData<Service[]>) => {
              this.is_loading = true
              this.list_service = data.details!.map(item => ({
                _id: item._id,
                nom: item.nom,
                prix: item.prix,
                duree: item.duree,
                commission: item.commission,
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
      this.service.updateService(id, this.updateForm.value).subscribe({
        next: () => {
          this.updateModal!.visible = false
        },
        error: (err) => console.log(err.message),
        complete: () => {
          this.service.getService().subscribe({
            next: (data: ResponseData<Service[]>) => {
              this.is_loading = true
              this.list_service = data.details!.map(item => ({
                _id: item._id,
                nom: item.nom,
                prix: item.prix,
                duree: item.duree,
                commission: item.commission,
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

  onCreateSubmit(){
    if (this.createForm.valid) {
      this.service.createService(this.createForm.value).subscribe({
        next: () => {
          this.createModal!.visible = false
        },
        error: (err) => console.log(err.message),
        complete: () => {
          this.service.getService().subscribe({
            next: (data: ResponseData<Service[]>) => {
              this.is_loading = true
              this.list_service = data.details!.map(item => ({
                _id: item._id,
                nom: item.nom,
                prix: item.prix,
                duree: item.duree,
                commission: item.commission,
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
      this.createModal!.visible = true
      this.createForm.markAllAsTouched();
    }
    
  }
}
