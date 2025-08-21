import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';

export type SortField = 'salary' | 'workType';

@Component({
  selector: 'app-sort-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-panel.html',
  styleUrls: ['./sort-panel.scss'],
})
export class SortPanelComponent {
  @Input() jobs: Job[] = [];
  @Output() sortedJobs = new EventEmitter<Job[]>();

  sortField: SortField = 'salary';
  sortAsc = true;

  onSortFieldChange(field: SortField): void {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc; // toggle sort order if same field
    } else {
      this.sortField = field;
      this.sortAsc = true;          // default ascending
    }

    const sorted = this.getSortedJobs(this.jobs, this.sortField, this.sortAsc);
    this.sortedJobs.emit(sorted);
  }

  private getSortedJobs(jobs: Job[], field: SortField, asc: boolean): Job[] {
    const sortedJobs = [...jobs]; // copy to avoid mutating input
    sortedJobs.sort((a, b) => {
      if (field === 'salary') {
        return asc ? a.startingSalary - b.startingSalary : b.startingSalary - a.startingSalary;
      } else {
        return asc ? a.workType.localeCompare(b.workType) : b.workType.localeCompare(a.workType);
      }
    });
    return sortedJobs;
  }
}
