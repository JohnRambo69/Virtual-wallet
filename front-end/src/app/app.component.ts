import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AccountService } from './services/account.service';
import { Stock } from './services/stocks.model';
import { StocksService } from './services/stocks.service';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { User } from './services/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StocksService
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  refresh: boolean = true;
  stocks: Array<Stock> = [];
  interval: any;
  show: boolean;

  user: User = null;
  userName: string;

  constructor(private accountService: AccountService, 
    private stocksService: StocksService, 
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.load();
    this.accountService.reset();

    this.show = this.userService.show;
    
    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000);
  }


  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


  private load(): void {
    this.stocksService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    }, error => {
      console.error(`Error while loading: ${error}`);      
    });
  }

  hideOrShowLoad() {
    this.userService.hideOrShowLoad();
  }

  handleUser(){
    this.userService.getUserJson(this.userName).subscribe(
      (user) => {
        this.user = user;
        this.accountService.loadUser(user);
        this.alertService.alert(`Logged as ${user.name}` , 'success');
      },
      (err) => {
        this.alertService.alert(`User not found`);
      }    
    );

    this.hideOrShowLoad();

}

handleSave() {
  let user: User = new User();
  user.name = this.userName;
  user.balance = this.accountService.balance;
  user.cost = this.accountService.cost;
  user.stocks = this.accountService.mapItems();
  this.userService.saveUser(user).subscribe(
    (user) => {
      console.log(user);
      this.alertService.alert(`Data saved for: ${user.name}` , 'success');
    },
    (err) => {
      this.alertService.alert(`Ooopps something goes wrong`);
    } 
  );

  this.user = user;
  this.hideOrShowLoad();

}

handlelogOut() {
  this.accountService.reset();
  this.user = null;
  this.alertService.alert(`You have been lgged out`);
  this.userName = '';
  this.hideOrShowLoad();
}


}
