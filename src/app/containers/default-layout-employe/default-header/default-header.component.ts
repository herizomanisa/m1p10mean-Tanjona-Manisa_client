import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { BlacklistTokenService } from '../../../services/blacklisttoken/blacklist-token.service';
import { HttpHeaders } from '@angular/common/http';
import { EmployeService } from '../../../services/employe/employe.service';

@Component({
  selector: 'app-default-header-employe',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderEmployeComponent extends HeaderComponent implements OnInit{
  private employeheader = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-e-token'));
  @Input() sidebarId: string = 'sidebar';

  @Input() token: string | null = '';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  commission: number = 0

  constructor(
    private classToggler: ClassToggleService,
    private localStorageService: LocalStorageService,
    private blacklist: BlacklistTokenService,
    private employeService: EmployeService,
    private route: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.employeService.getCommission(this.employeheader).subscribe({
      next: (result) => {
        if(result.details.length > 0) this.commission = result.details[0].total
        console.log(this.commission);
        
      },
      error: (err) => {
          console.log(err);
          
      },
      complete: () => {
          
      },
    })
  }

  logOut(): void {
    this.blacklist.deconnection(this.localStorageService.getData("x-authorization-e-token")!).subscribe({
      next: () => {
        this.localStorageService.removeData("x-authorization-e-token");
        this.route.navigate(['/employe/login']);
      },
      error: (err) => {console.log(err);
      },
      complete: () => {console.log("Deconnected");
      }
    })
  }
}
