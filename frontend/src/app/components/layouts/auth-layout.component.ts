import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
  <div class="max-w-screen-xl mx-auto pt-24 bg-white">
    <app-error></app-error>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class AuthLayoutComponent {}