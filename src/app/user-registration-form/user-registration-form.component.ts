import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
// This import brings in the API calls created
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  // imports: [CommonModule,HttpClientModule]
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        console.log(result);        
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);        
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
