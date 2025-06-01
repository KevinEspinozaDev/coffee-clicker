import { Component, effect, inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  storageService = inject(StorageService);
  historyCounter = this.storageService.getStorageFromKey(this.storageService.keyNameHistoryCounter);
  historyCounter$ = this.storageService.historyCounter$;

  constructor() {
    effect(() => {
      if (this.historyCounter$()) {
        this.historyCounter = this.storageService.getStorageFromKey(this.storageService.keyNameHistoryCounter);
      }
    });
  }

}
