import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { KEY_NAMES } from './constants/keynames.const';
import { FeaturesNamesEnum } from './constants/features.const';
import { LIFE_FEATURES, LifeFeaturesNamesEnum } from './constants/life-features.const';
import { StateService } from './services/state.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  storageService = inject(StorageService);
  stateService = inject(StateService);

  coffees = this.stateService.getCounter();

  private intervalId: any;

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

    if (!this.storageService.getStorageFromKey(KEY_NAMES.HISTORY_FEATURES_BOUGHT)) {
      this.stateService.setHistoryFeaturesBought(this.stateService.getFeaturesBought().reduce((acc, curr) => acc + curr.quantityBought, 0));
      this.storageService.saveStorageFromKey(KEY_NAMES.HISTORY_FEATURES_BOUGHT, this.stateService.getHistoryFeaturesBought()());
    }
  }

  ngOnInit() {

    // cada casa incrementa lo que diga en increasePerSecond cada segundo de la LifeFeature que coincida con su name
    this.intervalId = setInterval(() => {
      const lifeFeaturesBought = this.stateService.getLifeFeaturesBought();
      lifeFeaturesBought.forEach(f => {
        const lifeFeature = LIFE_FEATURES.find(lf => lf.name === f.name);
        if (lifeFeature) {
          this.stateService.setCounter(this.coffees() + lifeFeature.increasePerSecond);
          this.storageService.saveStorageFromKey(KEY_NAMES.COUNTER, this.coffees());
          this.stateService.setHistoryCounter(this.stateService.getHistoryCounter()() + lifeFeature.increasePerSecond);
          this.storageService.saveStorageFromKey(KEY_NAMES.HISTORY_COUNTER, this.stateService.getHistoryCounter()());
        }
      });
    }, 1000);


  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
