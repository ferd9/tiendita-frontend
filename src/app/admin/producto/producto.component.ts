import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Categoria, Proveedores, Tag } from '../interfaces/tienda.interfaces';
import { ProveedorComponent } from '../proveedor/proveedor.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProveedorComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  private fb = inject(FormBuilder);

  private productoService = inject(ProductoService);

  public countNuevos:number = 0;

  public proveedores: Proveedores[] = [];
  public categoria: Categoria[] = [];
  public tag: Tag[] = [];

  //constructor(private changeDetector: ChangeDetectorRef){}

  public formProducto: FormGroup = this.fb.group({
    'nombre': ['',[Validators.minLength(3), Validators.required]],
    'descripcion': [''],
    'precio': [0.0, [Validators.min(0),Validators.required]],
    'imgenUrl': [''],
    'disponible':[true],
    'fechaDeLanzamiento':[new Date,[Validators.required]],
    'proveedores': this.fb.array([
      this.fb.group({
        'nombre': ['']
      })
    ])
  });

 registrarProducto(){
    if(this.formProducto.valid){
      this.productoService.registrarProducto(this.formProducto.value)
      .subscribe((resp)=>{
        if(resp){
          this.countNuevos++;
          this.formProducto.markAllAsTouched();
          this.formProducto.reset(
          {
            'nombre':'',
            'descripcion': '',
            'precio': 0.00,
            'imgenUrl': '',
            'disponible': true,
            'fechaDeLanzamiento': new Date
          });
          //this.changeDetector.detectChanges();
        }
        console.log({resp});
        console.log("Too correcto...");
        console.log("Productos grabados: ",this.countNuevos);
      })

    }

  }


  agregarProveedor($event: Proveedores) {
    this.proveedores.push($event);
  }
}
