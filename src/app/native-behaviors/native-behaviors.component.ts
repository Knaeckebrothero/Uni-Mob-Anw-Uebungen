import { Component } from '@angular/core';

@Component({
  selector: 'app-native-behaviors',
  templateUrl: './native-behaviors.component.html',
  styleUrls: ['./native-behaviors.component.scss']
})
export class NativeBehaviorsComponent {
  permissionStatus: NotificationPermission = 'default';

  constructor() {
    if ('Notification' in window) {
      this.permissionStatus = Notification.permission;
    }
  }

  requestPermission() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }

    Notification.requestPermission().then(result => {
      this.permissionStatus = result;
    });
  }

  nonPersistentNotification() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }

    try {
      new Notification("Hi there - non-persistent!");
    } catch (err) {
      alert('Notification API error: ' + err);
    }
  }

  persistentNotification() {
    if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
      alert('Persistent Notification API not supported!');
      return;
    }

    navigator.serviceWorker.getRegistration().then(reg => {
      reg?.showNotification("Hi there - persistent!");
    }).catch(err => {
      alert('Service Worker registration error: ' + err);
    });
  }
}
