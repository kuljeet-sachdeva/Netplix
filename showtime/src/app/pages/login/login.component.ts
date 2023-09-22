import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  get f() { return this.loginForm.controls; }
  ngOnInit() {
    //Add User form validations
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  responseData: any;
  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.valid) {
      this.authService.loginCheck(this.loginForm.value).subscribe(
        response => {
          // console.log(response);
          this.responseData = response;
          // console.log(this.responseData.token);
          // console.log(this.responseData.role);
          // console.log(this.responseData.message);

          localStorage.setItem("token", this.responseData.token);  // Refer https://jscrambler.com/blog/working-with-angular-local-storage
          localStorage.setItem("role", this.responseData.role);
          localStorage.setItem("email", this.responseData.email);
          this.snackBar.open('You have successfully logged in', 'Success', {
            duration: 3000
          });
          if (this.responseData.role == 'customer') {
            // navigate to AdminDashboardComponent
            this.router.navigateByUrl("/");
          }
          else {
            this.router.navigateByUrl("/admin");
          }
        },
        error => {
          console.log(error);
          this.snackBar.open(error.error.message, error.error.error, {
            duration: 3000
          });
        });
    }

  }

}




