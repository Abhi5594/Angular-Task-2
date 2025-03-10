import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello, {{ title }}</h1>`,
})
export class AppComponent {
  title = 'Task-2';
}