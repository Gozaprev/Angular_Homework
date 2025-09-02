import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-panel.html',
  styleUrls: ['./info-panel.scss']
})
export class InfoPanelComponent implements OnInit {
  totalJobs = 0;
  totalApplied = 0;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.updateCounts();
    this.jobService.jobs$.subscribe(() => {
      this.updateCounts();
    });
  }

  updateCounts() {
    this.totalJobs = this.jobService.getAvailableJobs().length;
    this.totalApplied = this.jobService.getAppliedJobs().length;
  }
}
