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
  selectedStatus: string = ''; // Store the selected status as a single string

  constructor(
    private dataService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Code that accesses the document object
    }

    this.dataService.users$.subscribe((users: User[]) => {
      this.users = users;
      this.applyFilter();
    });

    this.dataService.statusFilter$.subscribe((status: string) => {
      this.selectedStatus = status; // Update selected status
      this.applyFilter();
    });
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value; // Get the selected status
    this.dataService.updateFilter(this.selectedStatus); // Update the filter in the service
  }

  // Apply filter based on the selected status
  applyFilter() {
    if (this.selectedStatus) {
      this.filteredUsers = this.users.filter((user) => user.status === this.selectedStatus);
    } else {
      this.filteredUsers = this.users; // Show all users if no status is selected
    }
  }
}