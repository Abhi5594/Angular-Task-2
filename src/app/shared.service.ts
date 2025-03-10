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

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private statusFilterSubject = new BehaviorSubject<string>(''); 
  statusFilter$ = this.statusFilterSubject.asObservable();

  addUser(user: User) {
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next([...currentUsers, user]);
  }

  updateFilter(status: string) {
    this.statusFilterSubject.next(status); 
  }
} 