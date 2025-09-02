import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SortField = 'salary' | 'workType';

@Component({
  selector: 'app-sort-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-panel.html',
  styleUrls: ['./sort-panel.scss'],
})
export class SortPanelComponent {
  // Declare inputs as signals
  field = input<SortField>();
  asc = input<boolean>();

  @Output() sortCriteriaChange = new EventEmitter<{ field: SortField; asc: boolean }>();

  onSortFieldChange(field: SortField) {
    // Toggle ascending if same field clicked, else default ascending
    const newAsc = this.field() === field ? !this.asc() : true;
    this.sortCriteriaChange.emit({ field, asc: newAsc });
  }
}
