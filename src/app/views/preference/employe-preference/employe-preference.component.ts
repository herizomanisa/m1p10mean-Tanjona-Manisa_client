import { Component, OnInit } from '@angular/core';

import { PreferenceService } from '../../../services/preference/preference.service';
import { Employe } from '../../../models/Employe';

import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-employe-preference',
  templateUrl: './employe-preference.component.html',
  styleUrl: './employe-preference.component.scss',
})
export class EmployePreferenceComponent implements OnInit {
  icons = { faSolidHeart, faRegularHeart };

  isLoading: boolean = false;
  isLoadingOnUpdate: boolean = false;
  listEmploye: Employe[] = [];

  constructor(private preferenceService: PreferenceService) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.isLoading = true;
    this.fetchListEmployePlusPreference();
  }

  fetchListEmployePlusPreference(): void {
    // this.isLoading = true;
    try {
      this.preferenceService.getPreferenceEmploye().subscribe({
        next: (response) => {
          this.listEmploye = response.details.map((item: any) => item.employe);
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  onDeletePreference(id: string): void {
    this.isLoadingOnUpdate = true;
    try {
      this.preferenceService.findAndDeletePreference(id, 'employe').subscribe({
        next: () => {
          this.fetchListEmployePlusPreference();
          this.isLoadingOnUpdate = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoadingOnUpdate = false;
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
