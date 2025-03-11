// I'm creating a standalone user form component with Angular forms and a shared service.
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService, User } from '../shared.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup;

  // This list contains predefined skills for user selection.
  skills = [
    'Programming Languages (Python, JavaScript, Java, C++)',
    'Frontend Development (HTML, CSS, JavaScript, React, Angular)',
    'Backend Development (Node.js, Express.js, Django, Spring Boot)',
    'Database Management (SQL - MySQL, PostgreSQL, NoSQL - MongoDB)',
    'Version Control (Git, GitHub, GitLab)',
    'APIs (RESTful APIs, GraphQL, API integrations)',
    'Cloud Basics (AWS, Azure, Firebase)',
    'Problem-Solving & DSA (Arrays, Linked Lists, HashMaps, Recursion)',
    'Testing (Jest, Mocha, JUnit)',
    'Deployment & CI/CD (Docker, Kubernetes, Jenkins, Netlify, Vercel)',
  ];

  constructor(private fb: FormBuilder, private dataService: SharedService) {
    // Initializing the form with required fields and validation rules.
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      experience: ['', Validators.required],
      graduationYear: ['', [Validators.required, Validators.min(2020)]],
      skills: ['', Validators.required],
      status: [''], 
    });
  }

  // This function determines the user's status based on age and experience.
  determineStatus(): string {
    const { age, experience } = this.userForm.value;

    if (age < 25 && experience < 2) return 'Pending';
    if (experience >= 2 && experience < 5) return 'In-progress';
    if (experience >= 5) return 'Completed';
    return 'Cancelled';
  }

  // Submitting the form, saving the data, and resetting the form after submission.
  submitForm() {
    if (this.userForm.valid) {
      const status = this.determineStatus();
      const userData: User = { ...this.userForm.value, status };
      this.dataService.addUser(userData);
      this.userForm.reset();
    }
  }
}
