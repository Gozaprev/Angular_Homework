import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job';
import { JobItemComponent } from '../job-item/job-item';
import { SortPanelComponent } from '../sort-panel/sort-panel';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent, SortPanelComponent],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.jobs$.subscribe(() => {

      this.jobs = this.jobService.getAvailableJobs();
    });
  }

  onApply(job: Job): void {
    this.jobService.applyToJob(job);
  }

  onSortedJobs(sortedJobs: Job[]): void {
    this.jobs = sortedJobs;
  }

}
