import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path:'home',
    component: TiendaComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'producto',
        loadComponent: () => import('./admin/producto/producto.component').then(m => m.ProductoComponent)
      },
      {
        path: 'proveedor',
        loadComponent: () => import('./admin/proveedor/proveedor.component').then(m => m.ProveedorComponent)
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }

    ]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
