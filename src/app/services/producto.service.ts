import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Producto } from '../admin/interfaces/tienda.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = "http://localhost:8080/producto";
  constructor() { }

  public registrarProducto(producto: Producto): Observable<Producto>{

    const body = {...producto}
    return this.http.post<Producto>(`${this.baseUrl}/crear`, body)
            .pipe(
              tap(console.log)
            );
  }
}
