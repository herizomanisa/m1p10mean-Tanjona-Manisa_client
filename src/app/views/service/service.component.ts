import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from '../../services/service/service.service';
import { PreferenceService } from '../../services/preference/preference.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { Service } from 'src/app/models/Service';

import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit {
  icons = { faSolidHeart, faRegularHeart };

  listService: Service[] = [];
  isLoading: boolean = false;
  isLoadingOnUpdate: boolean = false;

  constructor(
    private serviceService: ServiceService,
    private localStorageService: LocalStorageService,
    private preferenceService: PreferenceService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.fetchListServiceEmploye();
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

  fetchListServiceEmploye(): void {
    this.isLoading = true;
    try {
      this.preferenceService.getAllService().subscribe({
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

  onCreatePreference(id_service: string): void {
    this.isLoadingOnUpdate = true;
    try {
      const data = {
        id_customer:
          this.localStorageService.getDecodedAccessToken(
            this.localStorageService.getData('x-authorization-c-token')
          )?._id || '',
        id_prefere: id_service,
        designation: 'service',
      };
      this.preferenceService.createPreference(data).subscribe({
        next: () => {
          this.fetchListServiceEmploye();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoadingOnUpdate = false;
    }
  }

  onDeletePreference(id: string): void {
    this.isLoadingOnUpdate = true;
    try {
      this.preferenceService.findAndDeletePreference(id, 'service').subscribe({
        next: () => {
          this.fetchListServiceEmploye();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoadingOnUpdate = false;
    }
  }
}
