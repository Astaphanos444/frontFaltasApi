import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type UserCreateReq = {
  name: String,
  email: String,
  password: String
}
type User = {
  name: String,
  password: String
}

type UserCreate = {
  userName: String,
  email: String,
  password: String
}
type UserF = {
  userName : String,
  password : String
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}
  url = `http://localhost:5145`


  postUser(user : UserCreateReq): Observable<any>{
      let urlX: string = this.url + `/api/User`;
      let userF: UserCreate = {
        userName: user.name,
        email: user.email,
        password: user.password
      }
      return this.http.post(urlX, userF);
  }

  getLoginUser(user: User): Observable<any>{
      let urlX : string = this.url + `/api/User/login`;
      let userF : UserF = {
        userName : user.name,
        password : user.password
      }
      return this.http.post(urlX, userF);
  }
}
