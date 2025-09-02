import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job';
import { JobItemComponent } from '../job-item/job-item';
import { Job } from '../../models/job.model'

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './applied-jobs.html',
  styleUrls: ['./applied-jobs.scss'],
})
export class AppliedJobsComponent {
  jobService = inject(JobService);

  // Reactive signal to hold applied jobs
  appliedJobs = this.jobService.appliedJobs;

  onCancel(job: Job) {
    this.jobService.cancelApplication(job);
  }
}

