import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent 
{
  mobileMenuEnable: boolean = false;
  searchQuery: string = '';
  searchQueryPage: number = 1;
  constructor(private router: Router) {}

  toggleMobileMenu(): void {
    this.mobileMenuEnable = !this.mobileMenuEnable;
  }

  searchEnter(): void {
    if(this.searchQuery != '') {
      this.router.navigate(['search'], { queryParams: { query: this.searchQuery, page: this.searchQueryPage.toString()} });
    }
  }
}
