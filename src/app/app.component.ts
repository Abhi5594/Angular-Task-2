// I'm importing the necessary modules and components.
import { Component } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component'; // This is my user form component
import { StatusTableComponent } from './status-table/status-table.component'; // This is my status table component

// Now, I'm defining my main component
@Component({
  selector: 'app-root', // This is how I will use this component in HTML
  standalone: true, // I’m making this a standalone component, so it doesn’t need to be part of a module
  imports: [UserFormComponent, StatusTableComponent], // I need to import these two components because I'm using them inside this component
  template: `
    <!-- Here, I'm setting up the structure of my component -->
    <h1>Enter Details</h1>
    <div class="container">
      <app-user-form></app-user-form>
      <app-status-table></app-status-table> 
    </div>
  `,
  styles: [
    `
      /* I'm adding some styling for the container */
      .container {
        display: flex; /* I'm using flexbox to arrange items in a row */
        justify-content: space-around; /* This makes sure there's equal space around my items */
        padding: 20px; /* Just adding some padding for spacing */
      }
    `,
  ],
})
// I'm exporting this class so it can be used in my Angular app
export class AppComponent {}
