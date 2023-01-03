import { Component, OnInit } from '@angular/core';
// import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  constructor( private router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Open dialog when the signup button is clicked
   */
  openRegistrationView(): void {
    this.router.navigate(['registration']);
  }

  /**
   * Open dialog when the login button is clicked
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    // this.router.navigate(['login']);
  })
  }
}
