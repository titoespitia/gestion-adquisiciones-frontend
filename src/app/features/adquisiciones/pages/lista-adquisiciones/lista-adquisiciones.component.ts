import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../../core/state/app.state';
import { Observable } from 'rxjs';
import { selectAdquisiciones, selectAdquisicionesLoading } from '../../../../core/state/adquisiciones/adquisiciones.selectors';
import { cargarAdquisiciones, desactivarAdquisicion } from '../../../../core/state/adquisiciones/adquisiciones.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-adquisiciones',
  standalone: true,
  templateUrl: './lista-adquisiciones.component.html',
  styleUrls: ['./lista-adquisiciones.component.scss'],
  imports: [CommonModule, FormsModule, MatIconModule]
})
export class ListaAdquisicionesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  adquisiciones$: Observable<any> = this.store.select(selectAdquisiciones);
  loading$: Observable<boolean> = this.store.select(selectAdquisicionesLoading);

  adquisicionesFiltradas: any[] = [];
  filtro: string = '';
  tipoFiltro: string = '';
  tiposBienes: string[] = ['Medicamentos', 'Equipos médicos', 'Servicios médicos'];

  filtros: any = {
    presupuesto: '',
    unidadAdministrativa: '',
    tipoBienServicio: '',
    cantidad: '',
    valorUnitario: '',
    fechaAdquisicion: '',
    proveedor: '',
  };

  filtrarAdquisiciones(): void {

    this.adquisiciones$.subscribe(adquisiciones => {
      console.log(adquisiciones);
      this.adquisicionesFiltradas = adquisiciones.filter((adq: any) =>
        (this.filtros.presupuesto ? adq.presupuesto.toString().includes(this.filtros.presupuesto) : true) &&
        (this.filtros.unidadAdministrativa ? adq.unidadAdministrativa.toLowerCase().includes(this.filtros.unidadAdministrativa.toLowerCase()) : true) &&
        (this.filtros.tipoBienServicio ? adq.tipoBienServicio.toLowerCase().includes(this.filtros.tipoBienServicio.toLowerCase()) : true) &&
        (this.filtros.cantidad ? adq.cantidad.toString().includes(this.filtros.cantidad) : true) &&
        (this.filtros.valorUnitario ? adq.valorUnitario.toString().includes(this.filtros.valorUnitario) : true) &&
        (this.filtros.fechaAdquisicion ? new Date(adq.fechaAdquisicion).toISOString().split('T')[0] === this.filtros.fechaAdquisicion : true) &&
        (this.filtros.proveedor ? adq.proveedor.toLowerCase().includes(this.filtros.proveedor.toLowerCase()) : true)
      );
    });
  }

  ngOnInit(): void {
    this.store.dispatch(cargarAdquisiciones());
    this.adquisiciones$.subscribe(adquisiciones => {
      this.adquisicionesFiltradas = adquisiciones;
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  editarAdquisicion(id: number): void {
    this.router.navigate(['/adquisiciones/editar', id]);
  }

  desactivarAdquisicion(id: number): void {
    if (confirm('¿Estás seguro de que deseas desactivar esta adquisición?')) {
      this.store.dispatch(desactivarAdquisicion({ id }));
    }
  }

  verHistorial(id: number): void {
    this.router.navigate([`/historial/${id}`]);
  }
}
