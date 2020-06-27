import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from './../services/account.service';
import { AlertService } from './../services/alert.service';
import { UserService } from '../services/user.service';
import { User } from '../services/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user: User;
  refresh: boolean = true;


  constructor(private accountService: AccountService, 
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit() {

  }

  reset(): void {
    this.accountService.reset();
    this.alertService.alert(`Zresetowałeś swój portfel!`);
  }

  toggleRefresh(): void {
    this.refresh = !this.refresh;
    let onOff = (this.refresh) ? 'on' : 'off';
    this.alertService.alert(`Przełączyłeś automatyczne odświeżanie ${onOff}`, 'info', 0);
  }

  hideOrShowLoad() {
    this.userService.hideOrShowLoad();
  }

}
