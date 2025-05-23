import { HttpClient, HttpParams } from '@angular/common/http';
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
type PostMateria = {
  nome: String,
  maxFaltas: Number,
  userId : Number
}
type NewFalta = {
  userId: Number,
  materiaId: Number
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}
  url = `http://localhost:5145`
  userId: number = 0;
  materiaId: number = 0;
  materiaNome = "";

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

  setUserId(userId: number){
    this.userId = userId;
  }
  setMateriaId(materiaId: number){
    this.materiaId = materiaId;
  }
  setMateriaNome(materiaNome : string){
    this.materiaNome = materiaNome;
  }
  getMateriaNome(){
    return this.materiaNome;
  }
  
  postNewFalta(): Observable<any>{
    let urlX : string = this.url + `/api/Falta`;
    let post: NewFalta = {
      userId: this.userId,
      materiaId: this.materiaId
    }
    return this.http.post(urlX, post);
  }

  getMaterias(): Observable<any>{
    let urlX : string = this.url + `/api/Materia`;
    let params = new HttpParams()
      .set('userId', this.userId);
    return this.http.get(urlX, { params });
  }

  postMateria(nome: String): Observable<any>{
    let urlX : string = this.url + `/api/Materia`;
    let post : PostMateria = {
      nome : nome,
      maxFaltas : 0,
      userId : this.userId 
    }
    return this.http.post(urlX, post);
  }

  getFaltas(): Observable<any>{
    let urlX : string = this.url + `/api/Falta`;
     let params = new HttpParams()
      .set('userId', this.userId)
      .set('materiaId', this.materiaId);
    return this.http.get(urlX, {params});
  }

  deleteFalta(faltaId: any): Observable<any>{
     let urlX : string = this.url + `/api/Falta`;
     let params = new HttpParams()
      .set('faltaId', faltaId);
    return this.http.delete(urlX, {params});
  }
  deleteMateria(materiaId:any): Observable<any>{
     let urlX : string = this.url + `/api/Materia`;
     let params = new HttpParams()
      .set('materiaId', materiaId)
      .set('userId', this.userId);
    return this.http.delete(urlX, {params});
  }
}
