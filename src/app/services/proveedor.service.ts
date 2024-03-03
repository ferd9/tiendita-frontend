import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Proveedores } from '../admin/interfaces/tienda.interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = "http://localhost:8080/proveedor";
  constructor() { }

  public listarProveedores(): Observable<Proveedores[]>{


    return this.http.get<Proveedores[]>(`${this.baseUrl}/listar`)
            .pipe(
              tap(console.log)
            );
  }
}
