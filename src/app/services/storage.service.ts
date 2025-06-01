import { Injectable, signal, WritableSignal } from '@angular/core';
import { Feature, FeatureBought } from '../tab2/interfaces/feature.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  counter$ = signal(0);
  historyCounter$ = signal<number>(0);
  keyNameCounter: string = 'counter';
  keyNameFeaturesBought: string = 'featuresBought';
  keyNameHistoryCounter: string = 'historyCounter';

  features$ = signal<Feature[]>([
    {
      name: 'Coffee',
      price: 10,
      description: 'Adds +1 Coffee',
      increment: 1
    }
  ]);
  featuresBought$ = signal<FeatureBought[]>([
    {
      name: 'Coffee',
      quantityBought: 1
    }
  ]);

  setFeaturesBought(feature: FeatureBought) {

    const featuresBought = this.featuresBought$();
    const featureBought = featuresBought.find((f: FeatureBought) => f.name === feature.name);

    if (featureBought) {
      featureBought.quantityBought = feature.quantityBought;
    } else {
      featuresBought.push(feature);
    }
    this.featuresBought$.set(featuresBought);
    this.saveStorageFromKey(this.keyNameFeaturesBought, featuresBought);
  }

  getFeaturesBought() {
    return this.getStorageFromKey(this.keyNameFeaturesBought);
  }

  setFeatures(features: Feature[]) {
    this.features$.set(features);
  }

  getFeatures() {
    return this.features$();
  }

  setCounter(value: number) {
    this.counter$.set(value);
  }

  getCounter() {
    return this.counter$();
  }

  setHistoryCounter(value: number) {
    this.historyCounter$.set(value);
    this.saveStorageFromKey(this.keyNameHistoryCounter, this.historyCounter$());
  }

  getHistoryCounter() {
    return this.historyCounter$;
  }

  saveStorageFromKey(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStorageFromKey(key: string) {
    return JSON.parse(localStorage.getItem(key) || '0');
  }
}
