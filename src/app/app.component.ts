import { Component, inject } from '@angular/core';
import { StorageService } from './services/storage.service';
import { KEY_NAMES } from './constants/keynames.const';
import { FeaturesNamesEnum } from './constants/features.const';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  storageService = inject(StorageService);

  constructor() {

    if (!this.storageService.getStorageFromKey(KEY_NAMES.COUNTER)) {
      this.storageService.saveStorageFromKey(KEY_NAMES.COUNTER, 0);
    }
    if (!this.storageService.getStorageFromKey(KEY_NAMES.FEATURES_BOUGHT)) {
      this.storageService.saveStorageFromKey(KEY_NAMES.FEATURES_BOUGHT, [{ name: FeaturesNamesEnum.COFFEE, quantityBought: 1 }]);
    }
  }
}
