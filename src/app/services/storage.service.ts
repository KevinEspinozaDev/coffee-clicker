import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  counter$ = signal(0);
  keyNameCounter: string = 'counter';

  setCounter(value: number) {
    this.counter$.set(value);
  }

  getCounter() {
    return this.counter$();
  }

  saveStorageFromKey(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStorageFromKey(key: string): string {
    return JSON.parse(localStorage.getItem(key) || '0');
  }
}
