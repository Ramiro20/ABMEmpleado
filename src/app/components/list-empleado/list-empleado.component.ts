import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {
  displayedColumns: string[] = ['nombreCompleto', 'correo', 'estadoCivil', 'fechaIngreso','sexo','telefono','acciones'];
  dataSource = new MatTableDataSource();
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  listEmpleado: Empleado[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
   @ViewChild(MatSort,{static: true}) sort!: MatSort;

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog ,public snackBar: MatSnackBar) {

           }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados(){
        this.listEmpleado = this.empleadoService.getEmpleados();
        this.dataSource = new MatTableDataSource(<any> this.listEmpleado);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.listEmpleado);
  }

  eliminarEmpleado(index: number) {

      const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el empleado?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.empleadoService.eliminarEmpleado(index);
        this.cargarEmpleados();
        this.snackBar.open('El empleado fue eliminado con exito!', '',{
            duration: 3000
        });
      }
    });


  }



}
