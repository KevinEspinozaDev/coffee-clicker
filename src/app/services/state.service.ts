import { Injectable, computed, signal, WritableSignal } from '@angular/core';
import { Feature, FeatureBought } from '../tab2/interfaces/feature.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  counter$ = signal(0);

  historyCounter$ = signal<number>(0);
  historyFeaturesBought$ = signal<number>(1);

  features$ = computed<Feature[]>(() => [
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

}
