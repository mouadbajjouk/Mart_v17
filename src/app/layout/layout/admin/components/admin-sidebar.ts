import { Component, ElementRef } from '@angular/core';
import { AppAdminMenu } from './admin-menu';

@Component({
    selector: 'app-admin-sidebar',
    imports: [AppAdminMenu],
    styleUrl: '../styles/global.css',
    template: ` <div class="layout-sidebar">
    <app-admin-menu></app-admin-menu>
  </div>`
})
export class AppAdminSidebar {
  constructor(public el: ElementRef) {}
}
