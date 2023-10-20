import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent 
{
  mobileMenuEnable: boolean = false;

  toggleMobileMenu(): void{
    this.mobileMenuEnable = !this.mobileMenuEnable;
  }
}
