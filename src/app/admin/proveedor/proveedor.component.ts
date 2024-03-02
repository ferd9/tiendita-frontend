import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Proveedores } from '../interfaces/tienda.interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent {

  public newProveedor?: Proveedores;
  private fb = inject(FormBuilder);
  public formProveedor: FormGroup = this.fb.group({
    'nombre': ['',[Validators.required, Validators.minLength(3)]],
    'direccion': [''],
    'ruc': ['', [Validators.required]],
    'email': ['', [Validators.email]],
    'telefono': ['']
  });

  @Output()
  public onNewProveedor: EventEmitter<Proveedores> = new EventEmitter();


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


}
