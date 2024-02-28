import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  @Input() token: string | null = '';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(
    private classToggler: ClassToggleService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) {
    super();
  }

  logOut(): void {
    this.localStorageService.removeData("x-authorization-m-token");
    this.route.navigate(['/login']);
  }
}
