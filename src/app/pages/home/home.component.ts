import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private router = new Router();

  irAConsultar() {
    this.router.navigate(['/adquisiciones']);
  }

  irACrear() {
    this.router.navigate(['/adquisiciones/nuevo']);
  }
}
