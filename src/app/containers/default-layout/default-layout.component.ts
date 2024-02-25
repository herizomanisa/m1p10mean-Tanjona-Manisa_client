import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit{

  role: string | null = ""

  public navItems = navItems;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
      this.role = this.localStorageService.getData("x-authorization-c-token");
  }
}
