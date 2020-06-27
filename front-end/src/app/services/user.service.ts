import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { User, Item } from './User';


@Injectable()
export class UserService {
  show: boolean = false;

  user: User = null;

  constructor(private http: HttpClient) { }


  hideOrShowLoad() {
    if(this.show === false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  getUserJson(user: string) {
    return this.http.get<User>(ConfigService.get('user') + user);
  }

  saveUser(user: User) {
    return this.http.post<User>(ConfigService.get('user'), user);
  }

}


