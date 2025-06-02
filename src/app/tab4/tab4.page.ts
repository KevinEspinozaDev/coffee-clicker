import { Component, inject } from '@angular/core';
import { StateService } from '../services/state.service';
import { Feature } from '../tab2/interfaces/feature.interface';
import { KEY_NAMES } from '../constants/keynames.const';
import { FeatureBought } from '../tab2/interfaces/feature.interface';
import { StorageService } from '../services/storage.service';
import { LifeFeature, LifeFeatureBought } from '../tab2/interfaces/life-feature.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {

  stateService = inject(StateService);
  storageService = inject(StorageService);

  lifeFeatures = this.stateService.getLifeFeatures();
  coffees = this.stateService.getCounter();

  constructor() {}

  buyFeature(feature: LifeFeature) {

    const featureBought: LifeFeatureBought = {
      name: feature.name,
      quantityBought: this.getQuantityBoughtOfFeature(feature) + 1
    }

    if (this.getQuantityBoughtOfFeature(feature) === 0) {
      console.log([featureBought])
      this.stateService.setLifeFeaturesBought([ featureBought ]);
    } else {
      const updated = this.stateService.getLifeFeaturesBought().map(f =>
        f.name === featureBought.name ? { ...f, quantityBought: featureBought.quantityBought } : f
      );
      this.stateService.setLifeFeaturesBought(updated);
    }

    this.storageService.saveStorageFromKey(
      KEY_NAMES.LIFE_FEATURES_BOUGHT,
      this.stateService.getLifeFeaturesBought()
    );

    this.stateService.setCounter(this.coffees() - feature.price);
    this.storageService.saveStorageFromKey(KEY_NAMES.COUNTER, this.coffees());
  }

  getQuantityBoughtOfFeature(feature: LifeFeature) {
    const featureBought: LifeFeatureBought[] = this.stateService.getLifeFeaturesBought();
    if (featureBought.length === 0) return 0;

    const featureBoughtFound = featureBought.find((f: LifeFeatureBought) => f.name === feature.name);

    if (featureBoughtFound) {
      return featureBoughtFound.quantityBought;
    } else {
      return 0;
    }
  }
}
