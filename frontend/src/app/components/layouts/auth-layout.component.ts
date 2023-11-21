import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
  <div class="max-w-screen-xl mx-auto md:pt-32 pt-24 bg-white">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class AuthLayoutComponent {}