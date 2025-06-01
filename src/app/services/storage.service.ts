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
      price: 100,
      description: 'Adds +1 Coffee',
      increment: 1
    },
    {
      name: 'Coffee Cup',
      price: 300,
      description: 'Adds +2 Coffee',
      increment: 2
    },
    {
      name: 'Coffee Jar',
      price: 500,
      description: 'Adds +3 Coffee',
      increment: 3
    },
    {
      name: 'Coffee Box',
      price: 1000,
      description: 'Adds +5 Coffee',
      increment: 5
    },
    {
      name: 'Coffee Bag',
      price: 2500,
      description: 'Adds +10 Coffee',
      increment: 10
    },
    {
      name: 'Coffee Machine',
      price: 10000,
      description: 'Adds +20 Coffee',
      increment: 20
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
    this.featuresBought$.set([...this.featuresBought$(), feature]);
    this.saveStorageFromKey(this.keyNameFeaturesBought, featuresBought);
  }

  getFeaturesBought() {

    const featuresBought = this.getStorageFromKey(this.keyNameFeaturesBought);
    if (featuresBought === '') {
      this.saveStorageFromKey(this.keyNameFeaturesBought, [
        {
          name: 'Coffee',
          quantityBought: 1
        }
      ]);
      return [{
        name: 'Coffee',
        quantityBought: 1
      }];
    }

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
    if (localStorage.getItem(key) === null) {
      return '';
    }
    return JSON.parse(localStorage.getItem(key) || '');
  }
}
