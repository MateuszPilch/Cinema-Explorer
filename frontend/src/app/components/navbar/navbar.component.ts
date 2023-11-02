import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent 
{
  mobileMenuEnable: boolean = false;
  
  constructor(public searchService: SearchService) {}
  
  toggleMobileMenu(): void {
    this.mobileMenuEnable = !this.mobileMenuEnable;
  }
}