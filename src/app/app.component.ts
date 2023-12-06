import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  // Component properties
  title = 'pwa-hub';
  serviceWorkerVersion: string;

  // Constructor
  constructor(private swUpdate: SwUpdate) {}

  // Initialization feteches the app version from the service worker
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log(`Current version is ${event.currentVersion.hash}`);
          console.log(`Available version is ${event.latestVersion.hash}`);
        }
      });

      // Fetch the app version from the service worker
      this.fetchAppVersion();
    }
  }

  fetchAppVersion() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage('GET_VERSION');
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Current app version:', event.data.version);
      });
    }
  }

  // Optional: Update to the latest version
  updateToLatest() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
