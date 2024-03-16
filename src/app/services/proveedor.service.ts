import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pagination, Proveedores } from '../admin/interfaces/tienda.interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = "http://localhost:8080/proveedor";
  constructor() { }


  public listProveedores$ = (page: number = 0, size: number = 10): Observable<Pagination> =>
    this.http.get<Pagination>(`${this.baseUrl}/listar?page=${page}&size=${size}`);

  public listarProveedores(page: number, size: number): Observable<Pagination>{

    return this.http.get<Pagination>(`${this.baseUrl}/listar?page=${page}&size=${size}`)
            .pipe(
              tap(console.log)
            );
  }
}
