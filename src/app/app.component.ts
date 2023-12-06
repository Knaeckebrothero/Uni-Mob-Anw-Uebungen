import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // Component properties
  title = 'pwa-hub';
  serviceWorkerVersion: string = '#0000';

  // Constructor
  constructor(private swUpdate: SwUpdate, private cdr: ChangeDetectorRef) {}

  // Initialization fetches the app version from the service worker
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log(`Current version is ${event.currentVersion.hash}`);
          console.log(`Available version is ${event.latestVersion.hash}`);
        }
      });

      this.registerServiceWorker();
    }
  }

  registerServiceWorker() {
    navigator.serviceWorker.ready.then((registration) => {
      this.postMessageToServiceWorker(registration);
      
      // If the service worker changes (i.e., new worker has just become active)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('New service worker is active.');
        this.postMessageToServiceWorker(registration);
      });

      // Listen for messages from the service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.serviceWorkerVersion = event.data.version.appData.version;
        console.log('Current app version:', event.data.version);
        this.cdr.detectChanges();
      });
    });
  }

  postMessageToServiceWorker(registration: ServiceWorkerRegistration) {
    // Ensure we have an active service worker to post messages to
    if (registration.active) {
      registration.active.postMessage('GET_VERSION');
    } else {
      console.log('Waiting for service worker to become active.');
    }
  }
}
