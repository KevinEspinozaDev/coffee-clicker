import { Component, computed, effect, inject, signal } from '@angular/core';
import { Feature, FeatureBought } from './interfaces/feature.interface';
import { StorageService } from '../services/storage.service';
import { StateService } from '../services/state.service';
import { KEY_NAMES } from '../constants/keynames.const';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  showMessageCoffeesNews = signal(false);

  coffeesNews = signal(0);

  storageService = inject(StorageService);
  stateService = inject(StateService);

  counter = this.stateService.getCounter();

  constructor() {}

  increment() {

    this.showMessageCoffeesNews.set(true);
    const previousCounter: number = this.counter();
    let acumulator: number = 0;

    this.stateService.getFeaturesBought().forEach((featureBought: FeatureBought) => {
      acumulator = acumulator + (this.extractIncrementFromFeatureBought(this.stateService.getFeatures()(), featureBought) * featureBought.quantityBought);
    });


    const newCounter = previousCounter + acumulator;
    this.stateService.setCounter(newCounter);
    this.storageService.saveStorageFromKey(KEY_NAMES.COUNTER, newCounter);
    this.stateService.setCounter(newCounter);

    this.coffeesNews.set(newCounter - previousCounter);

    const previousHistoryCounter = parseInt(this.storageService.getStorageFromKey(KEY_NAMES.HISTORY_COUNTER));
    this.stateService.setHistoryCounter(previousHistoryCounter + this.coffeesNews());
    this.storageService.saveStorageFromKey(KEY_NAMES.HISTORY_COUNTER, this.stateService.getHistoryCounter()());

    setTimeout(() => {
      this.showMessageCoffeesNews.set(false);
    }, 200);
  }

  extractIncrementFromFeatureBought(features: Feature[], featureBought: FeatureBought) {
    const feature = features.find((feature: Feature) => feature.name === featureBought.name);
    return feature?.increment || 0;
  }

  reset() {
    this.stateService.setCounter(0);
  }

}
