import { Component } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { StatusTableComponent } from './status-table/status-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent, StatusTableComponent],
  template: `
    <h1>Enter Details</h1>
    <div class="container">
      <app-user-form></app-user-form>
      <app-status-table></app-status-table>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: space-around;
        padding: 20px;
      }
    `,
  ],
})
export class AppComponent {}