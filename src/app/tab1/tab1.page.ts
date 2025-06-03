import { Component, effect, inject } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  stateService = inject(StateService);
  historyCounter = this.stateService.getHistoryCounter();
  historyFeaturesBought = this.stateService.getHistoryFeaturesBought();
  constructor() {}
}
