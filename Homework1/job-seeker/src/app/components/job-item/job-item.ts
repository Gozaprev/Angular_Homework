// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-job-item',
//   imports: [],
//   templateUrl: './job-item.html',
//   styleUrl: './job-item.scss'
// })
// export class JobItem {

// }


// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Job } from '../../models/job.model';

// @Component({
//   selector: 'app-job-item',
//   templateUrl: './job-item.html',
//   styleUrls: ['./job-item.scss']
// })
// export class JobItemComponent {
//   @Input() job!: Job;
//   @Input() showApplyButton = true;
//   @Output() apply = new EventEmitter<Job>();
//   @Output() cancel = new EventEmitter<Job>();

//   expanded = false;

//   toggleDetails() {
//     this.expanded = !this.expanded;
//   }

//   onApply() {
//     this.apply.emit(this.job);
//   }

//   onCancel() {
//     this.cancel.emit(this.job);
//   }
// }



import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.html',
  styleUrls: ['./job-item.scss']
})
export class JobItemComponent {
  @Input() job!: Job;
  @Input() showApplyButton = true;
  @Output() apply = new EventEmitter<Job>();
  @Output() cancel = new EventEmitter<Job>();

  expanded = false;

  toggleDetails() {
    this.expanded = !this.expanded;
  }

  onApply() {
    this.apply.emit(this.job);
  }

  onCancel() {
    this.cancel.emit(this.job);
  }
}
