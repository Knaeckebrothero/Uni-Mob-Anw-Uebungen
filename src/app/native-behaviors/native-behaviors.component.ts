import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-native-behaviors',
  templateUrl: './native-behaviors.component.html',
  styleUrls: ['./native-behaviors.component.scss']
})
export class NativeBehaviorsComponent implements OnInit {
  permissionStatus: NotificationPermission = 'default';
  permissionStatuses: any = {};

  constructor() {
  }

  ngOnInit(): void {
    this.checkNotificationPermission();
    this.checkAllPermissions();
  }

  private checkNotificationPermission() {
    if ('Notification' in window) {
      this.permissionStatus = Notification.permission;
    }
  }

  private checkAllPermissions() {
    if ('permissions' in navigator) {
      const permissionsToCheck = ['geolocation', 'notifications', 'push', 'midi', 'camera', 'microphone', 'background-sync', 'ambient-light-sensor', 'accelerometer', 'gyroscope', 'magnetometer'];
      for (const permission of permissionsToCheck) {
        this.checkPermission(permission);
      }
    }
  }

  private checkPermission(permissionName: string, descriptor?: any) {
    navigator.permissions.query({ name: permissionName, ...descriptor })
      .then(permissionStatus => {
        this.permissionStatuses[permissionName] = permissionStatus.state;
        permissionStatus.addEventListener('change', () => {
          this.permissionStatuses[permissionName] = permissionStatus.state;
        });
      })
      .catch(error => console.error('Error checking permission:', permissionName, error));
  }

  requestGeolocation() {
    navigator.geolocation.getCurrentPosition(() => {}, () => {}, {});
  }

  requestNotifications() {
    Notification.requestPermission().then(result => {
      this.permissionStatus = result;
    });
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

  subscribeToPush() {
    navigator.serviceWorker.ready.then(registration => {
      return registration.pushManager.subscribe({ userVisibleOnly: true })
        .then(subscription => {
          console.log('Push Subscription:', subscription);
        })
        .catch(error => {
          console.error('Push Subscription error:', error);
        });
    });
  }

  checkPushSubscription() {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.getSubscription()
        .then(subscription => {
          if (subscription) {
            console.log('Already subscribed to push:', subscription);
          } else {
            console.log('Not subscribed to push');
          }
        });
    });
  }
}
