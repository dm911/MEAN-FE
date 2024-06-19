import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http.post(`${environment.apiUrl}/auth/login`, { username: this.username, password: this.password })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/transaction-list']);
        },
        (error) => {
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
}