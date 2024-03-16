import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Pagination, Proveedores } from '../interfaces/tienda.interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const enum MODE{
  REGISTRAR =  'REGISTRAR',
  LISTAR = 'LISTAR',
  AMBOS = 'AMBOS'
}

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit, OnChanges{


  public titulo: string = "Registrar Proveedor";

  /**
   * mediante observables.
   */
  public usersState$: Observable<{appData?: Pagination, error?: HttpErrorResponse }>;
  public responseSubject = new BehaviorSubject<Pagination>(this.pagination!);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();


  public modo: MODE = MODE.REGISTRAR;

  public proveedorList: Proveedores[] = [];

  public newProveedor?: Proveedores;

  public selectedProveedor?: Proveedores;

  @Input()
  public preveedorRegresado?: Proveedores;

  public pagination?: Pagination;

  public totalPages: Array<number> = [];

  private fb = inject(FormBuilder);
  private proveedorService = inject(ProveedorService);
  public formProveedor: FormGroup = this.fb.group({
    'nombre': ['',[Validators.required, Validators.minLength(3)]],
    'direccion': [''],
    'ruc': ['', [Validators.required]],
    'email': ['', [Validators.email]],
    'telefono': ['']
  });

  @Output()
  public onNewProveedor: EventEmitter<Proveedores> = new EventEmitter();

  @Output()
  public onAddProveedor: EventEmitter<Proveedores> = new EventEmitter();

  @Output()
  public onQuitarProveedorDeTabla: EventEmitter<Proveedores[]> = new EventEmitter();
  public isFirst: boolean = false;
  public isLast: boolean = false;
  public page: number = 0;
  public size: number = 2;


  constructor(){

     //this.loadingService.loadingOn();
     this.usersState$ = this.proveedorService.listProveedores$(0,2).pipe(
      map((response: Pagination) => {
        //this.loadingService.loadingOff();
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.number);
        console.log(response);
        return ({appData: response });
      }),
      catchError((error: HttpErrorResponse) =>{
        return of({ error })}
        )
    )

  }
  ngOnInit(): void {

    //this.mostrarProveedores();
  }

  ngOnChanges(): void {
      if(this.preveedorRegresado){
          this.proveedorList.push(this.preveedorRegresado);
      }
  }

  agregarProveedor(){
    //this.onNewProveedor.emit(this.newProveedor);
    console.log("Formulario valido: ",this.formProveedor.valid)
    console.log(this.formProveedor.value);
    if(this.formProveedor.valid){
      this.newProveedor = {...this.formProveedor.value};
      this.formProveedor.markAllAsTouched();
      this.formProveedor.reset();
      this.onNewProveedor.emit(this.newProveedor);
      console.log(this.newProveedor);
    }
  }

  mostrarProveedores(){
    this.proveedorService.listarProveedores(this.page, this.size).subscribe(
      resp => {
        //this.proveedorList = resp;
        this.pagination = resp;
        this.totalPages = new Array(this.pagination.totalPages);
        this.isFirst = this.pagination.first;
        this.isLast = this.pagination.last;
        console.log("Respuestaaa");
        console.log({resp});
      }
    );
  }

  onSelecionarProveedor(){
    this.onAddProveedor.emit(this.selectedProveedor);
  }

  addProveedor(index: number){
    this.selectedProveedor = this.proveedorList.splice(index,1)[0];
    this.onSelecionarProveedor()
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.mostrarProveedores();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.mostrarProveedores();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.mostrarProveedores();
  }

  onEventQuitarProveedorDeTabla(){

  }

  gotToPage(pageNumber: number = 0): void {

    this.usersState$ = this.proveedorService.listProveedores$(pageNumber).pipe(
      map((response: Pagination) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log(response);
        return ({ appData: response });
      }),
      startWith({appData: this.responseSubject.value }),
      catchError((error: HttpErrorResponse) =>{
        return of({error })}
        )
    )
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.gotToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

}
