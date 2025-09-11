// import { Component, signal, inject, effect } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Job } from '../../models/job.model';
// import { JobService } from '../../services/job';
// import { JobItemComponent } from '../job-item/job-item';
// import { SortPanelComponent } from '../sort-panel/sort-panel';

// @Component({
//   selector: 'app-job-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, JobItemComponent, SortPanelComponent],
//   templateUrl: './job-list.html',
//   styleUrls: ['./job-list.scss'],
// })
// export class JobListComponent {
//   jobService = inject(JobService);

//   searchText = signal('');
//   sortField = signal<'salary' | 'workType'>('salary');
//   sortAsc = signal(true);

//   jobs = signal<Job[]>([]);

//   constructor() {
//     effect(() => {
//       const allJobs = this.jobService.availableJobs();
//       const search = this.searchText().toLowerCase();
//       const field = this.sortField();
//       const asc = this.sortAsc();

//       let filtered = allJobs.filter(job => {
//         if (!search) return true;
//         return job.company.toLowerCase().includes(search) || job.position.toLowerCase().includes(search);
//       });

//       filtered = filtered.sort((a, b) => {
//         if (field === 'salary') {
//           return asc ? a.startingSalary - b.startingSalary : b.startingSalary - a.startingSalary;
//         } else {
//           return asc ? a.workType.localeCompare(b.workType) : b.workType.localeCompare(a.workType);
//         }
//       });

//       this.jobs.set(filtered);
//     });
//   }

//   onApply(job: Job) {
//     this.jobService.applyToJob(job);
//   }

//   onCancel(job: Job) {
//     this.jobService.cancelApplication(job);
//   }

//   onSearchChange(value: string) {
//     this.searchText.set(value);
//   }

//   onSortChange(event: { field: 'salary' | 'workType'; asc: boolean }) {
//     this.sortField.set(event.field);
//     this.sortAsc.set(event.asc);
//   }
// }

/////////////////////////////////////////////////////////////////////////////


// import { Component, signal, inject, effect } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Job } from '../../models/job.model';
// import { JobService } from '../../services/job';
// import { JobItemComponent } from '../job-item/job-item';
// import { SortPanelComponent } from '../sort-panel/sort-panel';

// type SortField = 'salary' | 'workType';

// @Component({
//   selector: 'app-job-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, JobItemComponent, SortPanelComponent],
//   templateUrl: './job-list.html',
//   styleUrls: ['./job-list.scss'],
// })
// export class JobListComponent {
//   jobService = inject(JobService);

//   searchText = signal('');
//   sortField = signal<SortField>('salary');
//   sortAsc = signal(true);

//   jobs = signal<Job[]>([]);

//   constructor() {
//     effect(() => {
//       const allJobs = this.jobService.availableJobs();
//       const search = this.searchText().toLowerCase();
//       const field = this.sortField();
//       const asc = this.sortAsc();

//       let filtered = allJobs.filter(job => {
//         if (!search) return true;
//         return (
//           job.company.toLowerCase().includes(search) ||
//           job.position.toLowerCase().includes(search)
//         );
//       });

//       filtered = this.sortJobs(filtered, field, asc);
//       this.jobs.set(filtered);
//     });
//   }

//   sortJobs(jobs: Job[], field: SortField, asc: boolean): Job[] {
//     const sorted = [...jobs];
//     if (field === 'salary') {
//       sorted.sort((a, b) =>
//         asc ? a.startingSalary - b.startingSalary : b.startingSalary - a.startingSalary
//       );
//     } else {
//       const workTypeOrder = { remote: 0, hybrid: 1, onsite: 2 };
//       sorted.sort((a, b) =>
//         asc
//           ? workTypeOrder[a.workType] - workTypeOrder[b.workType]
//           : workTypeOrder[b.workType] - workTypeOrder[a.workType]
//       );
//     }
//     return sorted;
//   }

//   onApply(job: Job) {
//     this.jobService.applyToJob(job);
//   }

//   onCancel(job: Job) {
//     this.jobService.cancelApplication(job);
//   }

//   onSearchChange(value: string) {
//     this.searchText.set(value);
//   }

//   onSortChange(event: { field: SortField; asc: boolean }) {
//     this.sortField.set(event.field);
//     this.sortAsc.set(event.asc);
//   }

//   availableJobsCount() {
//     return this.jobService.availableJobs().length;
//   }

//   appliedJobsCount() {
//     return this.jobService.appliedJobs().length;
//   }
// }

//////////////////////////////////////////////////


import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job';
import { JobItemComponent } from '../job-item/job-item';
import { SortPanelComponent } from '../sort-panel/sort-panel';

type SortField = 'salary' | 'workType';

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
  sortField = signal<SortField>('salary');
  sortAsc = signal(true);

  // A computed signal to handle filtering and sorting in a declarative way.
  // This will automatically re-evaluate whenever its dependencies change.
  filteredAndSortedJobs = computed(() => {
    const allJobs = this.jobService.availableJobs();
    const search = this.searchText().toLowerCase();
    const field = this.sortField();
    const asc = this.sortAsc();

    let filtered = allJobs.filter(job => {
      if (!search) return true;
      return (
        job.company.toLowerCase().includes(search) ||
        job.position.toLowerCase().includes(search)
      );
    });

    // Use a pure function to sort the filtered jobs
    return this.sortJobs(filtered, field, asc);
  });

  // A pure function for sorting, which is now called from the computed signal.
  private sortJobs(jobs: Job[], field: SortField, asc: boolean): Job[] {
    const sorted = [...jobs];
    if (field === 'salary') {
      sorted.sort((a, b) =>
        asc ? a.startingSalary - b.startingSalary : b.startingSalary - a.startingSalary
      );
    } else {
      const workTypeOrder = { remote: 0, hybrid: 1, onsite: 2 };
      sorted.sort((a, b) =>
        asc
          ? workTypeOrder[a.workType] - workTypeOrder[b.workType]
          : workTypeOrder[b.workType] - workTypeOrder[a.workType]
      );
    }
    return sorted;
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

  onSortChange(event: { field: SortField; asc: boolean }) {
    this.sortField.set(event.field);
    this.sortAsc.set(event.asc);
  }

  // These methods are now no longer needed as the template can directly
  // access the signal values via the `jobService`.
  //
  // availableJobsCount() {
  //   return this.jobService.availableJobs().length;
  // }
  //
  // appliedJobsCount() {
  //   return this.jobService.appliedJobs().length;
  // }
}
