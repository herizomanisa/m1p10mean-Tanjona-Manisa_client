import { Component, OnInit } from '@angular/core';
import { Offre } from '../../../models/Offre';
import { ResponseData } from 'src/app/models/ResponseData';
import { HttpHeaders } from '@angular/common/http';
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.scss'
})
export class OffreComponent implements OnInit{
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-c-token'));
  is_loading: Boolean = false
  list_offre: Offre[]=[]

  constructor(
    private service: ClientService,
  ){}

  ngOnInit(): void {
    this.is_loading = true
    this.service.getOffres(this.headers).subscribe({
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
}
