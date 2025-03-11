import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedService, User } from '../shared.service';

@Component({
  selector: 'app-status-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.css'],
})
export class StatusTableComponent implements OnInit {
  statuses = ['Completed', 'Pending', 'In-progress', 'Cancelled'];
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedStatus: string = ''; 

  constructor(
    private dataService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject platform ID to check if it's running in a browser
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Ensures browser-specific code runs only in the browser environment
    }

    this.dataService.users$.subscribe((users: User[]) => {
      this.users = users;
      this.applyFilter();
    });

    this.dataService.statusFilter$.subscribe((status: string) => {
      this.selectedStatus = status; 
      this.applyFilter();
    });
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value; 
    this.dataService.updateFilter(this.selectedStatus); // Updates the status filter in the shared service
  }

  applyFilter() {
    if (this.selectedStatus) {
      this.filteredUsers = this.users.filter((user) => user.status === this.selectedStatus);
    } else {
      this.filteredUsers = this.users; 
    }
  }
}
