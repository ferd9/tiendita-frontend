import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Proveedores } from '../interfaces/tienda.interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';

const enum MODE{
  REGISTRAR =  'REGISTRAR',
  LISTAR = 'LISTAR',
  AMBOS = 'AMBOS'
}

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit, OnChanges{


  public titulo: string = "Registrar Proveedor";
  public modo: MODE = MODE.REGISTRAR;

  public proveedorList: Proveedores[] = [];

  public newProveedor?: Proveedores;

  public selectedProveedor?: Proveedores;

  @Input()
  public preveedorRegresado?: Proveedores;

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

  ngOnInit(): void {
    this.mostrarProveedores();
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
    this.proveedorService.listarProveedores().subscribe(
      resp => {
        this.proveedorList = resp;
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

  onEventQuitarProveedorDeTabla(){

  }

}
