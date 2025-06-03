import { Component, inject } from '@angular/core';
import { StorageService } from './services/storage.service';
import { KEY_NAMES } from './constants/keynames.const';
import { FeaturesNamesEnum } from './constants/features.const';
import { LifeFeaturesNamesEnum } from './constants/life-features.const';
import { StateService } from './services/state.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  storageService = inject(StorageService);
  stateService = inject(StateService);

  constructor() {

    // Counter
    if (!this.storageService.getStorageFromKey(KEY_NAMES.COUNTER)) {
      this.storageService.saveStorageFromKey(KEY_NAMES.COUNTER, 0);
    } else {
      this.stateService.setCounter(this.storageService.getStorageFromKey(KEY_NAMES.COUNTER));
    }

    // Features
    if (!this.storageService.getStorageFromKey(KEY_NAMES.FEATURES_BOUGHT)) {
      this.storageService.saveStorageFromKey(KEY_NAMES.FEATURES_BOUGHT, [{ name: FeaturesNamesEnum.COFFEE, quantityBought: 1 }]);
    } else {
      this.stateService.setFeaturesBought(this.storageService.getStorageFromKey(KEY_NAMES.FEATURES_BOUGHT));
    }

    // Life Features
    if (this.storageService.getStorageFromKey(KEY_NAMES.LIFE_FEATURES_BOUGHT)) {
      this.stateService.setLifeFeaturesBought(this.storageService.getStorageFromKey(KEY_NAMES.LIFE_FEATURES_BOUGHT));
    }

    // Stats
    if (!this.storageService.getStorageFromKey(KEY_NAMES.HISTORY_COUNTER)) {
      this.storageService.saveStorageFromKey(KEY_NAMES.HISTORY_COUNTER, this.stateService.getCounter()());
    }
    if (this.storageService.getStorageFromKey(KEY_NAMES.HISTORY_COUNTER)) {
      this.stateService.setHistoryCounter(parseInt(this.storageService.getStorageFromKey(KEY_NAMES.HISTORY_COUNTER)));
    }
  }
}
