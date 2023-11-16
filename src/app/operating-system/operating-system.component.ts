import { Component } from '@angular/core';

@Component({
  selector: 'app-operating-system',
  templateUrl: './operating-system.component.html',
  styleUrls: ['./operating-system.component.scss']
})
export class OperatingSystemComponent {
  usage: number | string = 'unknown';
  quota: number | string = 'unknown';
  percent: number | string = 'unknown';
  persisted: string = 'unknown';

  constructor() {}

  oninit() {
    this.checkStorageEstimate();
    this.checkPersisted();
  }

  checkStorageEstimate() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(estimate => {
        this.usage = estimate.usage ?? 'unknown';
        this.quota = estimate.quota ?? 'unknown';
        this.percent = estimate.quota && estimate.usage !== undefined 
                       ? ((estimate.usage * 100) / estimate.quota).toFixed(0) 
                       : 'unknown';
      });
    }
  }

  checkPersisted() {
    if ('storage' in navigator && 'persisted' in navigator.storage) {
      navigator.storage.persisted().then(persisted => {
        this.persisted = persisted ? 'persisted' : 'not persisted';
      });
    }
  }

  requestPersistence() {
    if ('storage' in navigator && 'persist' in navigator.storage) {
      navigator.storage.persist().then(persisted => {
        this.persisted = persisted ? 'persisted' : 'not persisted';
      });
    }
  }
}