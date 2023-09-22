import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAdmin=false;
  userLoggedIn=false;

  constructor(private router: Router) {
    this.checkLogin();
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));
    this.checkLogin();
  }
  ngOnChanges() {
    this.checkLogin();
  }

  navbg: any;
  @HostListener('document:scroll') scrollover() {
    // console.log(document.body.scrollTop,'scrolllength#');
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#0000'
      }
    } else {
      this.navbg = {}
    }
  }

  checkLogin() {
    if (localStorage.getItem('token') != "") {
      if(localStorage.getItem('role') != "customer"){
        this.isAdmin = true;
      }
      this.userLoggedIn = true;
    }
  }

  logoutUser() {
    localStorage.setItem('token', '');
    localStorage.setItem('role', '');
    localStorage.setItem('email', '');
    this.checkLogin();
    this.router.navigateByUrl("/login");
  }

}
