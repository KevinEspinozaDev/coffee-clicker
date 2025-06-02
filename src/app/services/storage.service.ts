import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Feature, FeatureBought } from '../tab2/interfaces/feature.interface';
import { StateService } from './state.service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  stateService = inject(StateService);

  saveStorageFromKey(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStorageFromKey(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
