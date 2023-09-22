import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  profilePicture: null;
  validCityNames=[];

  error_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Name must not contains numeric values' }
    ],

    'fatherName': [
      { type: 'required', message: 'Father Name is required.' },
      { type: 'pattern', message: 'Father name must not contains numeric values' }
    ],
    'mobile': [
      { type: 'required', message: 'Mobile is required.' },
      { type: 'pattern', message: 'Mobile must contains numeric values & 10 digits' }

    ],
    'city': [
      { type: 'required', message: 'City is required.' },
      { type: 'pattern', message: 'City must not contains numeric values' }
    ],
    'address': [
      { type: 'required', message: 'Address is required.' },
      { type: 'pattern', message: 'Address must not contains numeric values' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length should be at least 6 characters.' },
      { type: 'maxlength', message: 'Email length should not exceed 30 characters.' },
      { type: 'email', message: 'Please enter a valid email address.' }
    ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length must be at least 6 characters.' },
      { type: 'pattern', message: 'The password must have 1 uppercase letter, and 1 number.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm Password is required.' },
      { type: 'minlength', message: 'Confirm Password length should be at least 6 characters.' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const phoneNumberRegex1 = /^[6-9]\d{9}$/;

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      mobile: ['', [Validators.required, Validators.pattern(phoneNumberRegex1)]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      address: ['', [Validators.required]],
      profilePic: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern(emailregex)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      terms: ['']
    }, {
      validators: [this.passwordMatchValidator.bind(this), this.cityValidator.bind(this)]
    });
  }

  ngOnInit() {
    this.authService.getCities().then(cities => {
      this.validCityNames = cities;
    });
  }

  cityValidator(control: AbstractControl): ValidationErrors | null {

    const enteredCity = control.get('city').value;
    // console.log(this.validCityNames);
    if (!this.validCityNames.includes(enteredCity.toLowerCase())) {
      // console.log("true");
      return { invalidCity: true };
    }
    return null;
  }


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }



  sendSignupData() {
    if (this.signUpForm.valid) {
      // this.signUpForm.value.profilePic = this.previewImage;
      // console.log(this.signUpForm.value);
      const user = {
        ...this.signUpForm.value,
        role: "customer"
      }
      user.profilePic = null;
      this.authService.registerUser(user).subscribe({
        next: (response) => {
          console.log(response);
          this.snackBar.open('You have successfully logged In', 'Success', {
            duration: 8000
          });
          this.router.navigateByUrl("/login");
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(error.error.message, error.error.error, {
            duration: 8000
          });
        }
      });
    }
  }

  onProfilePictureSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    this.urlToByteArray(this.previewImage);
  }


  byteArrayToUrl(byteArray: any) {
    console.log(byteArray);
    byteArray = new Uint8Array([byteArray[0], byteArray[1], byteArray[2]]);
    console.log(byteArray);
    let byteArrayString = "";
    for (let i = 0; i < byteArray.length; i++) {
      byteArrayString += String.fromCharCode(byteArray[i]);
    }

    // Encode the byte array string as base64
    const base64EncodedString = btoa(byteArrayString);
    console.log("----------------------------");
    console.log(base64EncodedString);
  }

  urlToByteArray(base64String: any) {
    const decodedString = atob(base64String);

    // Create a byte array from the decoded string
    const byteArray = new Uint8Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
      byteArray[i] = decodedString.charCodeAt(i);
    }
    console.log("----------------------------");
    console.log(byteArray);
    this.byteArrayToUrl(byteArray);
  }


}