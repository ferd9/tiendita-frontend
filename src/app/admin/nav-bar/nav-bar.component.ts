import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface menuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'admin-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  menuItems: menuItem[] = [
    {name: 'Dashboard', route: '/admin/dashboard'},
    {name: 'Productos', route: '/admin/producto'},
    {name: 'Proveedor', route: '/admin/proveedor'}
  ];
}
