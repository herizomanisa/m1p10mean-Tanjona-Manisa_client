import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from '../../services/service/service.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { Service } from 'src/app/models/Service';

import { cilHeart } from '@coreui/icons';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit {
  icons = { cilHeart };

  listService: Service[] = [];
  isLoading: boolean = false;

  constructor(
    private serviceService: ServiceService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.fetchListService();
  }

  fetchListService(): void {
    this.isLoading = true;
    try {
      this.serviceService.getService().subscribe({
        next: (response) => {
          this.listService = response.details;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
