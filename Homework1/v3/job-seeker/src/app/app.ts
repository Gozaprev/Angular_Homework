import { Component, signal, inject } from '@angular/core';
import { JobService } from './services/job';
import { JobListComponent } from './components/job-list/job-list';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, JobListComponent, AppliedJobsComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  jobService = inject(JobService);
}
