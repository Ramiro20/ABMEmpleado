import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEmpleadoComponent implements OnInit {
  estadoCiviles: any[] = ['Soltero','Casado','Divorciado'];
  idEmpleado: any;
  accion = 'Crear';
  myForm : FormGroup ;
//  myForm= new FormGroup({});
  constructor(private fb: FormBuilder,private empleadoService: EmpleadoService, private route: Router,private snackBar: MatSnackBar,private aRoute: ActivatedRoute) {
    this.myForm = this.fb.group({
     nombreCompleto: [''],
     correo: [''],
     fechaIngreso: [''],
     telefono: [''],
     estadoCivil: [''],
     sexo: ['']
   });
   const idParam = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[idParam];
  }


  ngOnInit(): void {
  }

  guardarEmpleado(){
  const empleado: Empleado={
      nombreCompleto: this.myForm.value.nombreCompleto,
      correo: this.myForm.value.corre,
      fechaIngreso: this.myForm.value.fechaIngreso,
      telefono: this.myForm.value.telefono,
      estadoCivil: this.myForm.value.estadoCivil,
      sexo: this.myForm.value.sexo
    }
    if (this.idEmpleado !== undefined) {
        this.editarEmpleado(empleado);
      } else {
        this.agregarEmpleado(empleado);
      }
  }

  agregarEmpleado(empleado: Empleado) {
   this.empleadoService.agregarEmpleado(empleado);
   this.snackBar.open('El empleado fue registrado con exito!', '', {
     duration: 3000
   });
   this.route.navigate(['/']);
 }

 editarEmpleado(empleado: Empleado) {
    this.empleadoService.editEmpleado(empleado, this.idEmpleado);
    this.snackBar.open('El empleado fue actualizado con exito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

}
