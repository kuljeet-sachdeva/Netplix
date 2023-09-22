import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary form-related modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user-favourite.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;  // Declare the form group

  constructor(private fb: FormBuilder,private authService:AuthService, private snackbar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.authService.sendEmail(this.contactForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.snackbar.open('We will reach out to you soon.', 'Success', {
            duration: 8000
          });
        },
        error: (error) => {
          console.log(error);
          this.snackbar.open(error.error.message, error.error.error, {
            duration: 8000
          });
        }
      });
      this.contactForm.reset();
    }
  }
}
