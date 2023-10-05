import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  isLoading: Subject<boolean> = new Subject<boolean>();

  start(): void {
    this.isLoading.next(true);
  }

  end(): void {
    this.isLoading.next(false);
  }
}
