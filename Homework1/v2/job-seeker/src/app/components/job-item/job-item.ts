import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.html',
  styleUrls: ['./job-item.scss'],
})
export class JobItemComponent {
  @Input() job!: Job;
  @Input() showApplyButton = true;

  @Output() apply = new EventEmitter<Job>();
  @Output() cancel = new EventEmitter<Job>();

  isExpanded = signal(false);

  toggleExpand() {
    this.isExpanded.set(!this.isExpanded());
  }

  onApplyClick() {
    this.apply.emit(this.job);
  }

  onCancelClick() {
    this.cancel.emit(this.job);
  }
}
