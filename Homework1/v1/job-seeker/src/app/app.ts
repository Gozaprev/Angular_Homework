import { Component } from '@angular/core';
import { JobListComponent } from './components/job-list/job-list';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs';
import { InfoPanelComponent } from './components/info-panel/info-panel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InfoPanelComponent, JobListComponent, AppliedJobsComponent],
  template: `
    <div class="container">
      <h1>JOB SEEKER</h1>
      <app-info-panel></app-info-panel>
      <app-job-list></app-job-list>
      <app-applied-jobs></app-applied-jobs>
    </div>
  `,
  styleUrls: ['./app.scss']
})
export class AppComponent { }


