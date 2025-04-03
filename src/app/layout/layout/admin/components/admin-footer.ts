import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-admin-footer',
  styleUrl: '../styles/global.css',
  template: `<div class="layout-footer">
    Mart
    <a
      href="https://primeng.org"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
      >Dashboard</a
    >
  </div>`,
})
export class AppAdminFooter {}
