import { Component } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeGoRnR';

  constructor(private authService: AuthService, private router: Router) { };

  logOut() {
    this.authService.SignOut();
  }

  checkIfAdmin() {
    var checkRole = this.authService.isAdmin;
    return checkRole;
  }

  getUserName(){
    var user_email = this.authService.userEmail;
    return user_email;
  }

  checkIfLoggedIn() {
    return this.authService.isLoggedIn;
  }

  checkIfLogPage() {
    return this.router.url === '/login' || this.router.url === '/registration';
  }
}
