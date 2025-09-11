// import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Job } from '../../models/job.model';

// @Component({
//   selector: 'app-job-item',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './job-item.html',
//   styleUrls: ['./job-item.scss'],
// })
// export class JobItemComponent {
//   @Input() job!: Job;
//   @Input() showApplyButton = true;

//   @Output() apply = new EventEmitter<Job>();
//   @Output() cancel = new EventEmitter<Job>();

//   isExpanded = signal(false);

//   toggleExpand() {
//     this.isExpanded.set(!this.isExpanded());
//   }

//   onApplyClick() {
//     this.apply.emit(this.job);
//   }

//   onCancelClick() {
//     this.cancel.emit(this.job);
//   }
// }


import { Component, input, output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.html',
  styleUrls: ['./job-item.scss'],
})

// Old code:

// export class JobItemComponent {
//   job = input<Job>();
//   showApplyButton = input<boolean>();
//   // apply = output<Job>();
//   // cancel = output<Job>();
//   apply = output<void>();
//   cancel = output<void>();


//   isExpanded = signal(false);

//   toggleExpand() {
//     this.isExpanded.update(value => !value);
//   }

//   // Refactor handlers to emit events directly without a conditional check
//   onApplyClick() {
//     this.apply.emit();
//   }

//   onCancelClick() {
//     this.cancel.emit();
//   }

//   // toggleExpand() {
//   //   this.isExpanded.set(!this.isExpanded());


//   // }

//   // onApplyClick() {
//   //   this.apply.emit(this.job());
//   // }

//   // onCancelClick() {
//   //   this.cancel.emit(this.job());
//   // }

//   // onApplyClick() {
//   //   const job = this.job();
//   //   if (job) {
//   //     this.apply.emit(job);
//   //   }
//   // }

//   // onCancelClick() {
//   //   const job = this.job();
//   //   if (job) {
//   //     this.cancel.emit(job);
//   //   }
//   // }
// }

export class JobItemComponent {
  job = input.required<Job>();
  showApplyButton = input<boolean>();

  apply = output<Job>();
  cancel = output<Job>();

  isExpanded = signal(false);

  toggleExpand() {
    this.isExpanded.update(value => !value);
  }

  onApplyClick() {
    this.apply.emit(this.job());
  }

  onCancelClick() {
    this.cancel.emit(this.job());
  }
}