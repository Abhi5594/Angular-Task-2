import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService, User } from '../shared.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Ensure ReactiveFormsModule is imported
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup; // Define the form group
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
    // Initialize the form group with form controls and validators
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      experience: ['', Validators.required],
      graduationYear: ['', [Validators.required, Validators.min(2020)]],
      skills: ['', Validators.required],
      status: [''], // Status will be determined programmatically
    });
  }

  // Determine the status based on age and experience
  determineStatus(): string {
    const { age, experience } = this.userForm.value;

    if (age < 25 && experience < 2) return 'Pending';
    if (experience >= 2 && experience < 5) return 'In-progress';
    if (experience >= 5) return 'Completed';
    return 'Cancelled';
  }

  // Handle form submission
  submitForm() {
    if (this.userForm.valid) {
      const status = this.determineStatus();
      const userData: User = { ...this.userForm.value, status }; // Add status to the form data
      this.dataService.addUser(userData); // Add the user to the shared service
      this.userForm.reset(); // Reset the form
    }
  }
}