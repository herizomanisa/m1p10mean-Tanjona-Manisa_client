import { Component, OnInit } from '@angular/core';

import { navItemsEmploye } from './_nav_employe';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-default-layout-employe',
  templateUrl: './default-layout-employe.component.html',
  styleUrl: './default-layout-employe.component.scss',
})
export class DefaultLayoutEmployeComponent implements OnInit {
  role: string | null = '';

  public navItems = navItemsEmploye;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.role = this.localStorageService.getData('x-authorization-e-token');
  }
}
