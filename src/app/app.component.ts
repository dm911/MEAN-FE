import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Transaction Manager';
  isAuthenticated:boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = authService.isAuthenticated()
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}