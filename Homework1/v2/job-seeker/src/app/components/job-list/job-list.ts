import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job';
import { JobItemComponent } from '../job-item/job-item';
import { SortPanelComponent } from '../sort-panel/sort-panel';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, JobItemComponent, SortPanelComponent],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.scss'],
})
export class JobListComponent {
  jobService = inject(JobService);

  searchText = signal('');
  sortField = signal<'salary' | 'workType'>('salary');
  sortAsc = signal(true);

  jobs = signal<Job[]>([]);

  constructor() {
    effect(() => {
      const allJobs = this.jobService.availableJobs();
      const search = this.searchText().toLowerCase();
      const field = this.sortField();
      const asc = this.sortAsc();

      let filtered = allJobs.filter(job => {
        if (!search) return true;
        return job.company.toLowerCase().includes(search) || job.position.toLowerCase().includes(search);
      });

      filtered = filtered.sort((a, b) => {
        if (field === 'salary') {
          return asc ? a.startingSalary - b.startingSalary : b.startingSalary - a.startingSalary;
        } else {
          return asc ? a.workType.localeCompare(b.workType) : b.workType.localeCompare(a.workType);
        }
      });

      this.jobs.set(filtered);
    });
  }

  onApply(job: Job) {
    this.jobService.applyToJob(job);
  }

  onCancel(job: Job) {
    this.jobService.cancelApplication(job);
  }

  onSearchChange(value: string) {
    this.searchText.set(value);
  }

  onSortChange(event: { field: 'salary' | 'workType'; asc: boolean }) {
    this.sortField.set(event.field);
    this.sortAsc.set(event.asc);
  }
}
