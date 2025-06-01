import { Component, computed, effect, inject, signal } from '@angular/core';
import { Feature } from './interfaces/feature.interface';
import { StorageService } from '../services/storage.service';

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
  counter = parseInt(this.storageService.getStorageFromKey(this.storageService.keyNameCounter));
  counter$ = this.storageService.counter$;

  constructor() {
    effect(() => {
      if (this.counter$()) {
        this.counter = parseInt(this.storageService.getStorageFromKey(this.storageService.keyNameCounter));
      }
    });
  }

  increment() {
    this.showMessageCoffeesNews.set(true);
    const previousCounter: number = this.counter;
    let acumulator: number = 0;

    this.storageService.getFeaturesBought().forEach((featureBought: any) => {
      acumulator += featureBought.quantityBought;
    });

    const newCounter = previousCounter + acumulator;
    this.storageService.setCounter(newCounter);
    this.storageService.saveStorageFromKey(this.storageService.keyNameCounter, newCounter);
    this.counter = newCounter;

    this.coffeesNews.set(newCounter - previousCounter);

    const previousHistoryCounter = parseInt(this.storageService.getStorageFromKey(this.storageService.keyNameHistoryCounter));
    this.storageService.setHistoryCounter(previousHistoryCounter + (newCounter - previousCounter));

    setTimeout(() => {
      this.showMessageCoffeesNews.set(false);
    }, 200);
  }

  reset() {
    this.storageService.setCounter(0);
  }

}
