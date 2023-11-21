import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent 
{
  mobileMenuEnable: boolean = false;
  
  constructor(public searchService: SearchService, public authService: AuthService) {}
  
  toggleMobileMenu(): void {
    this.mobileMenuEnable = !this.mobileMenuEnable;
  }
}