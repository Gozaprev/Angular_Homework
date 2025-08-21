import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job';
import { JobItemComponent } from '../job-item/job-item';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './applied-jobs.html',
  styleUrls: ['./applied-jobs.scss']
})
export class AppliedJobsComponent implements OnInit {
  appliedJobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.loadAppliedJobs();
    this.jobService.jobs$.subscribe(() => {
      this.loadAppliedJobs();
    });
  }

  loadAppliedJobs() {
    this.appliedJobs = this.jobService.getAppliedJobs();
  }

  onCancel(job: Job) {
    this.jobService.cancelApplication(job);
  }
}




