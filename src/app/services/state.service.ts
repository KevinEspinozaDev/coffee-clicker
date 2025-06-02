import { Injectable, computed, inject, signal } from '@angular/core';
import { Feature, FeatureBought } from '../tab2/interfaces/feature.interface';
import { LifeFeature, LifeFeatureBought } from '../tab2/interfaces/life-feature.interface';
import { FEATURES, FeaturesNamesEnum } from '../constants/features.const';
import { LIFE_FEATURES } from '../constants/life-features.const';
import { StorageService } from './storage.service';
import { KEY_NAMES } from '../constants/keynames.const';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  counter$ = signal(0);

  historyCounter$ = signal<number>(0);
  historyFeaturesBought$ = signal<number>(1);

  features$ = computed<Feature[]>(() => FEATURES);
  featuresBought$ = signal<FeatureBought[]>([
    {
      name: FeaturesNamesEnum.COFFEE,
      quantityBought: 1
    }
  ]);

  lifeFeatures$ = computed<LifeFeature[]>(() => LIFE_FEATURES);
  lifeFeaturesBought$ = signal<LifeFeatureBought[]>([]);

  constructor() {}

  // Getters and setters
  getCounter() {
    return this.counter$;
  }
  setCounter(value: number) {
    this.counter$.set(value);
  }

  getHistoryCounter() {
    return this.historyCounter$;
  }
  setHistoryCounter(value: number) {
    this.historyCounter$.set(value);
  }

  getHistoryFeaturesBought() {
    return this.historyFeaturesBought$;
  }
  setHistoryFeaturesBought(value: number) {
    this.historyFeaturesBought$.set(value);
  }

  getFeatures() {
    return this.features$;
  }

  getFeaturesBought() {
    return this.featuresBought$();
  }
  setFeaturesBought(value: FeatureBought[]) {
    this.featuresBought$.set(value);
  }

  getLifeFeatures() {
    return this.lifeFeatures$;
  }

  getLifeFeaturesBought() {
    return this.lifeFeaturesBought$();
  }
  setLifeFeaturesBought(value: LifeFeatureBought[]) {
    this.lifeFeaturesBought$.set(value);
  }

}
