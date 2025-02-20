import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { cargarHistorial } from '../../../../core/state/historial/historial.actions';
import { selectHistorial } from '../../../../core/state/historial/historial.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-historial',
  standalone: true,
  templateUrl: './lista-historial.component.html',
  styleUrls: ['./lista-historial.component.scss'],
  imports: [CommonModule, MatIconModule] // Importa Material Icons
})
export class ListaHistorialComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  historial$: Observable<any> = this.store.select(selectHistorial);

  ngOnInit(): void {
    const adquisicionId = Number(this.route.snapshot.paramMap.get('id'));
    if (adquisicionId) {
      this.store.dispatch(cargarHistorial({ adquisicionId }));
    }
  }

  volver(): void {
    this.router.navigate(['/adquisiciones']);
  }
}
