import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent {
  pasoActual: number = 0;

  avanzar = () => {
    if (this.pasoActual < 4){
      this.pasoActual++;
    }
    console.log("Paso Actual: " + this.pasoActual);
  }

  retroceder = () => {
    if (this.pasoActual > 0){
      this.pasoActual--;
    }
    console.log("Paso Actual: " + this.pasoActual);
  }

}
