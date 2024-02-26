import { Component, OnInit } from '@angular/core';

import { navItemsClient } from './_nav_client';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-default-layout-client',
  templateUrl: './default-layout-client.component.html',
  styleUrl: './default-layout-client.component.scss',
})
export class DefaultLayoutClientComponent implements OnInit {
  role: string | null = '';

  public navItems = navItemsClient;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.role = this.localStorageService.getData('x-authorization-c-token');
  }
}
