import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
// import { MatDialog, MatDialogRef, } from '@angular/material/dialog';
// This import brings in the API calls created
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
    // public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    // public myForm: FormGroup,
  ) {}

  ngOnInit(): void {}



  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        // this.dialogRef.close(); // This will close the modal on success!
        alert('User successfully created. You will be navigated to log in page')  
        this.router.navigate(['login']);     

      }
    );
  }
}
