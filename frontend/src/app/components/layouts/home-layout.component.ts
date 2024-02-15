import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
  <app-navbar></app-navbar>
  <div class="max-w-screen-xl mx-auto md:pt-32 pt-24">
    <app-error></app-error>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class HomeLayoutComponent {}