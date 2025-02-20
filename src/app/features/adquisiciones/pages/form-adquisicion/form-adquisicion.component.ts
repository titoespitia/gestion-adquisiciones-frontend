import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppState } from '../../../../core/state/app.state';
import { agregarAdquisicion,  modificarAdquisicion } from '../../../../core/state/adquisiciones/adquisiciones.actions';
import { selectAdquisiciones } from '../../../../core/state/adquisiciones/adquisiciones.selectors';
import { Adquisicion } from '../../../../core/models/adquisicion.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY' }
};

@Component({
  selector: 'app-form-adquisicion',
  standalone: true,
  templateUrl: './form-adquisicion.component.html',
  styleUrls: ['./form-adquisicion.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class FormAdquisicionComponent implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  adquisicionCreada = false;
  errorMensaje = '';
  adquisicionId!: number;
  isEditMode = false;

  ngOnInit(): void {

    this.inicializarFormulario();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.adquisicionId = +params['id'];
        this.isEditMode = true;
        this.cargarDatosAdquisicion();
      }
    });
  }

  inicializarFormulario(): void {
    this.form = this.fb.group({
      presupuesto: ['', [Validators.required, Validators.min(1)]],
      unidadAdministrativa: ['', Validators.required],
      tipoBienServicio: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      valorUnitario: ['', [Validators.required, Validators.min(1)]],
      valorTotal: ['', Validators.required],
      fechaAdquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: ['', Validators.required],
    });

    this.form.get('cantidad')?.valueChanges.subscribe(() => this.calcularTotal());
    this.form.get('valorUnitario')?.valueChanges.subscribe(() => this.calcularTotal());
  }

  cargarDatosAdquisicion(): void {
    this.store.select(selectAdquisiciones).subscribe((adquisiciones) => {
      const adquisicion = adquisiciones.find(a => a.id === this.adquisicionId);
      if (adquisicion) {
        this.form.patchValue({
          ...adquisicion,
          fechaAdquisicion: adquisicion.fechaAdquisicion
            ? new Date(adquisicion.fechaAdquisicion).toISOString().split('T')[0] // ✅ Formato `yyyy-MM-dd`
            : ''
        });
      }
    });
  }

  calcularTotal(): void {
    const cantidad = this.form.get('cantidad')?.value || 0;
    const valorUnitario = this.form.get('valorUnitario')?.value || 0;
    this.form.patchValue({ valorTotal: cantidad * valorUnitario });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let adquisicion: Adquisicion = this.form.value;
      if (this.isEditMode) {
        adquisicion = { ...adquisicion, usuarioModificador: 'Administrador' };
        adquisicion.id = this.adquisicionId;
        console.log('✏️ Actualizando adquisición...', adquisicion);
        this.store.dispatch(modificarAdquisicion({ id: this.adquisicionId, adquisicion }));
      } else {
        console.log('📢 Creando nueva adquisición...', adquisicion);
        this.store.dispatch(agregarAdquisicion({ adquisicion }));
      }
      this.adquisicionCreada = true;

      setTimeout(() => {
        this.adquisicionCreada = false;
        this.router.navigate(['/adquisiciones']);
      }, 2000);
    }
  }

  volver(): void {
    this.router.navigate(['/adquisiciones']);
  }
}
