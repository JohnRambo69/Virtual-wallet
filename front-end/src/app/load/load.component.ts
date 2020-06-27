import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, Item } from '../services/User';



@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  user: User = null;
  userName: string;

  constructor(private userService: UserService) { }


  ngOnInit() {
  }

  hideOrShowLoad() {
    this.userService.hideOrShowLoad();
  }

  handleUser(){
    this.userService.getUserJson(this.userName).subscribe(
      (user) => {
        this.user = user;
        console.log("USER ££££££££" + this.user);
        this.userService.user = user;
      },
      (err) => {
        console.log("User NOT FOUND");
      }
      
    );

}

handleSave() {

}
    
  }



