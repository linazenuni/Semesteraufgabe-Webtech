import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  protected title = 'buecher-app';

  constructor() {
    console.log(' App-Komponente geladen');
  }
}

