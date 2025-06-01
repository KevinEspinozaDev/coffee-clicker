import { Component, effect, inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Feature, FeatureBought } from '../tab2/interfaces/feature.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  coffees = 0;
  storageService = inject(StorageService);

  constructor() {
    this.coffees = parseInt(this.storageService.getStorageFromKey(this.storageService.keyNameCounter));

    effect(() => {
      if (this.storageService.getCounter()) {
        this.coffees = parseInt(this.storageService.getStorageFromKey(this.storageService.keyNameCounter));
      }
    });
  }

  buyFeature(feature: Feature) {

    if (this.getQuantityBoughtOfFeature(feature) === 0) {
      this.storageService.setFeaturesBought({
        name: feature.name,
        quantityBought: 1
      });
    } else {
      this.storageService.setFeaturesBought({
        name: feature.name,
        quantityBought: this.getQuantityBoughtOfFeature(feature) + 1
      });
      this.storageService.saveStorageFromKey(
        this.storageService.keyNameFeaturesBought,
        this.storageService.getFeaturesBought()
      );
    }

    this.coffees -= feature.price;
    this.storageService.setCounter(this.coffees);
    this.storageService.saveStorageFromKey(this.storageService.keyNameCounter, this.coffees);
  }

  getQuantityBoughtOfFeature(feature: Feature) {
    const featureBought: any = this.storageService.getFeaturesBought();
    if (featureBought === undefined) return 0;

    const featureBoughtFound = featureBought.find((f: FeatureBought) => f.name === feature.name);

    if (featureBoughtFound) {
      return featureBoughtFound.quantityBought;
    }
  }
}
