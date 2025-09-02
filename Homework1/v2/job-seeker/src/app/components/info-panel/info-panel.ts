import { Component, inject } from '@angular/core';
import { JobService } from '../../services/job';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-panel.html',
  styleUrls: ['./info-panel.scss'],
})
export class InfoPanelComponent {
  jobService = inject(JobService);

  //  signals exposed from service directly
  jobs = this.jobService.jobs;
  availableJobs = this.jobService.availableJobs;
  appliedJobs = this.jobService.appliedJobs;

  get totalJobs(): number {
    return this.availableJobs().length;
  }

  get totalApplied(): number {
    return this.appliedJobs().length;
  }
}

