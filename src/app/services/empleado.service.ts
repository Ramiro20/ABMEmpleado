import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  listEmpleado : Empleado [] = [
      { nombreCompleto:'Lucas Martines',correo: 'lmartinez@gmail.com', telefono: 45684646,
        sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: "Soltero"
      },
      { nombreCompleto:'Mario Torres',correo: 'mariotorrez22@gmail.com', telefono: 456456454,
        sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: "Soltero"
      },
      { nombreCompleto:'Maria Virginia',correo: 'maria_virginia@gmail.com', telefono: 2646846,
        sexo: 'Femenino', fechaIngreso: new Date(), estadoCivil: "Casado"
      },
      { nombreCompleto:'Jorge LLusco',correo: 'jorge_llusco223@gmail.com', telefono: 7565165,
        sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: "Divorciado"
      },
      { nombreCompleto:'Ximena Piedras',correo: 'ximena_piedras.11@gmail.com', telefono: 59594555,
        sexo: 'Femenino', fechaIngreso: new Date(), estadoCivil: "Casado"
      }
  ];

  constructor() { }

  getEmpleados(){
      return this.listEmpleado.slice();
  }

  eliminarEmpleado(index: number){
      this.listEmpleado.splice(index,1);
  }

  agregarEmpleado(empleado: Empleado){
    this.listEmpleado.push(empleado);
  }

  editEmpleado(empleado: Empleado, idEmpleado: number){
     this.listEmpleado[idEmpleado].nombreCompleto = empleado.nombreCompleto;
     this.listEmpleado[idEmpleado].correo = empleado.correo;
     this.listEmpleado[idEmpleado].fechaIngreso = empleado.fechaIngreso;
     this.listEmpleado[idEmpleado].telefono = empleado.telefono;
     this.listEmpleado[idEmpleado].sexo = empleado.sexo;
     this.listEmpleado[idEmpleado].estadoCivil = empleado.estadoCivil;
   }

}
