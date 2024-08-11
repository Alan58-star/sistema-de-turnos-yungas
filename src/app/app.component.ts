import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/main-page/nav/nav.component';
import { FooterComponent } from './components/main-page/footer/footer.component';
import { BodyComponent } from './components/main-page/body/body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavComponent,
    BodyComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prototipo-turnos-web';
}
