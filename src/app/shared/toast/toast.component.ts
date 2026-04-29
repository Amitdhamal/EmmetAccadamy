import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast {{ toast.type }}" (click)="toastService.remove(toast.id)">
          <span class="material-icons">{{ getIcon(toast.type) }}</span>
          <span>{{ toast.message }}</span>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
  getIcon(type: string): string {
    const icons: Record<string, string> = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
    return icons[type] ?? 'info';
  }
}
