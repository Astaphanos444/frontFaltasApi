import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../services/http.service';

type User = {
  name: String,
  password: String
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private request : HttpService, private router : Router){}

  errorMessage = '';

  name = '';
  password = '';

  loginUser(){
    const user : User = {
      name : this.name,
      password : this.password
    }

    this.request.getLoginUser(user).subscribe({
      next: (data: any) => {
        this.router.navigate(['app']);
      },
      error: (error: any) => {
        this.errorMessage = 'Invalid credentials';
        console.log('error')
      }
    });
  }

}
