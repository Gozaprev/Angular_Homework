import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobs: Job[] = [
    {
      company: 'TechCorp',
      expires: '2025-12-01',
      position: 'Frontend Developer',
      startingSalary: 60000,
      workType: 'remote',
      location: 'New York',
      country: 'USA',
      qualifications: 'Angular, TypeScript',
      description: 'Develop UI for the main product.',
      isApplied: false,
    },
    {
      company: 'Innovatech',
      expires: '2025-10-15',
      position: 'Backend Developer',
      startingSalary: 70000,
      workType: 'onsite',
      location: 'Berlin',
      country: 'Germany',
      qualifications: 'Node.js, Express, MongoDB',
      description: 'Build REST APIs for clients.',
      isApplied: false,
    },
    {
      company: 'Soft Solutions',
      expires: '2025-11-30',
      position: 'Fullstack Developer',
      startingSalary: 65000,
      workType: 'hybrid',
      location: 'London',
      country: 'UK',
      qualifications: 'React, Node.js',
      description: 'Work on fullstack projects.',
      isApplied: false,
    },
    {
      company: 'Avenga',
      expires: '2025-11-30',
      position: 'Angular Developer',
      startingSalary: 67000,
      workType: 'hybrid',
      location: 'London',
      country: 'UK',
      qualifications: 'Angular.js',
      description: 'Work on angular projects.',
      isApplied: false,
    },
    {
      company: 'Qinshift',
      expires: '2025-11-30',
      position: '.NET Developer',
      startingSalary: 80000,
      workType: 'hybrid',
      location: 'London',
      country: 'UK',
      qualifications: 'C#, .NET core',
      description: 'Work on .NET projects.',
      isApplied: false,
    },
    {
      company: 'Seavus',
      expires: '2025-11-30',
      position: 'React Developer',
      startingSalary: 75000,
      workType: 'hybrid',
      location: 'London',
      country: 'UK',
      qualifications: 'React, Node.js',
      description: 'Work on fullstack projects.',
      isApplied: false,
    },
  ];

  private jobsSubject = new BehaviorSubject<Job[]>(this.jobs);
  jobs$ = this.jobsSubject.asObservable();

  constructor() { }

  getAvailableJobs(): Job[] {
    return this.jobs.filter(job => !job.isApplied);
  }

  getAppliedJobs(): Job[] {
    return this.jobs.filter(job => job.isApplied);
  }

  applyToJob(job: Job): void {
    const index = this.findJobIndex(job);
    if (index === -1) return;
    this.jobs[index].isApplied = true;
    this.jobsSubject.next([...this.jobs]);
  }

  cancelApplication(job: Job): void {
    const index = this.findJobIndex(job);
    if (index === -1) return;
    this.jobs[index].isApplied = false;
    this.jobsSubject.next([...this.jobs]);
  }

  private findJobIndex(job: Job): number {
    return this.jobs.findIndex(j => j.position === job.position && j.company === job.company);
  }
}
