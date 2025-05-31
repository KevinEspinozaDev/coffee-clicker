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
  features = signal<Feature[]>([
    {
      name: 'Coffee',
      description: 'Coffee',
      price: 0,
      increment: 1,
    },
  ]);

  storageService = inject(StorageService);
  counter = parseInt(this.storageService.getStorageFromKey(this.storageService.keyNameCounter));

  constructor() {}

  increment() {
    this.showMessageCoffeesNews.set(true);
    const previousCounter: number = this.counter;
    let acumulator: number = 0;

    this.features().forEach((feature) => {
      acumulator += feature.increment;
    });

    const newCounter = previousCounter + acumulator;
    this.storageService.setCounter(newCounter);
    this.storageService.saveStorageFromKey(this.storageService.keyNameCounter, newCounter);
    this.counter = newCounter;

    this.coffeesNews.set(newCounter - previousCounter);

    setTimeout(() => {
      this.showMessageCoffeesNews.set(false);
    }, 300);
  }

  reset() {
    this.storageService.setCounter(0);
  }

}
