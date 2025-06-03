import { Component, effect, inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Feature, FeatureBought } from '../tab2/interfaces/feature.interface';
import { StateService } from '../services/state.service';
import { KEY_NAMES } from '../constants/keynames.const';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  storageService = inject(StorageService);
  stateService = inject(StateService);
  coffees = this.stateService.getCounter();

  features = this.stateService.getFeatures();

  constructor() {}

  buyFeature(feature: Feature) {

    const featureBought: FeatureBought = {
      name: feature.name,
      quantityBought: this.getQuantityBoughtOfFeature(feature) + 1
    }

    if (this.getQuantityBoughtOfFeature(feature) === 0) {
      this.stateService.setFeaturesBought([ ...this.stateService.getFeaturesBought(), featureBought ]);
    } else {
      const updated = this.stateService.getFeaturesBought().map(f =>
        f.name === featureBought.name ? { ...f, quantityBought: featureBought.quantityBought } : f
      );
      this.stateService.setFeaturesBought(updated);
    }

    this.storageService.saveStorageFromKey(
      KEY_NAMES.FEATURES_BOUGHT,
      this.stateService.getFeaturesBought()
    );

    // Consulta por cada elemento en el quantityBought y lo sumas, incluso si está repetido, que se sumen todos los quantityBought
    const counterHistoryFeaturesBought =
    this.stateService.getFeaturesBought().reduce((acc, curr) => acc + curr.quantityBought, 0);

    this.storageService.saveStorageFromKey(
      KEY_NAMES.HISTORY_FEATURES_BOUGHT,
      counterHistoryFeaturesBought
    );

    this.stateService.setCounter(this.coffees() - feature.price);
    this.storageService.saveStorageFromKey(KEY_NAMES.COUNTER, this.coffees());
  }

  getQuantityBoughtOfFeature(feature: Feature) {
    const featureBought: FeatureBought[] = this.stateService.getFeaturesBought();
    if (featureBought.length === 0) return 0;

    const featureBoughtFound = featureBought.find((f: FeatureBought) => f.name === feature.name);

    if (featureBoughtFound) {
      return featureBoughtFound.quantityBought;
    } else {
      return 0;
    }
  }
}
