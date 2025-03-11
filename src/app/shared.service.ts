import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  age: number;
  experience: number;
  graduationYear: number;
  skills: string;
  status: string;
}

// I'm making this service injectable so it can be used throughout the app.
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // I'm using BehaviorSubject to store and manage the user list.
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable(); // Other components can subscribe to this.

  // I'm also using BehaviorSubject to track the selected status filter.
  private statusFilterSubject = new BehaviorSubject<string>(''); 
  statusFilter$ = this.statusFilterSubject.asObservable(); // Components can listen for filter updates.

  // This function adds a new user to the list and updates the subscribers.
  addUser(user: User) {
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next([...currentUsers, user]);
  }

  // This function updates the status filter and notifies all subscribers.
  updateFilter(status: string) {
    this.statusFilterSubject.next(status); 
  }
}
