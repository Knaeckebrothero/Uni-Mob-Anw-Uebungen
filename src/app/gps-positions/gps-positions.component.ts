import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';


interface Location {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-gps-positions',
  templateUrl: './gps-positions.component.html',
  styleUrls: ['./gps-positions.component.scss']
})
export class GpsPositionsComponent implements OnInit, OnDestroy {

  tiltLR: number = 0;
  tiltFB: number = 0;
  direction: number = 0;
  isSupported: boolean = 'DeviceOrientationEvent' in window;
  isGeoLocationSupported: boolean = 'geolocation' in navigator;
  currentLocation?: Location;
  watchId?: number;

  constructor() { }

  ngOnInit() {
    if (!this.isSupported) {
      console.log('Device Orientation API not supported.');
    }
  }

  ngOnDestroy() {
    window.removeEventListener('deviceorientation', this.deviceOrientationHandler);
    if (this.watchId !== undefined) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  @HostListener('window:deviceorientation', ['$event'])
  deviceOrientationHandler(eventData: DeviceOrientationEvent) {
    this.tiltLR = Math.round(eventData.gamma!);
    this.tiltFB = Math.round(eventData.beta!);
    this.direction = Math.round(eventData.alpha!);
  }

  getTransform(): string {
    const rotate = `rotate(${this.tiltLR}deg)`;
    const rotate3d = `rotate3d(1,0,0, ${this.tiltFB * -1}deg)`;
    return `${rotate} ${rotate3d}`;
  }

  askForLocation() {
    if (this.isGeoLocationSupported) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.appendLocation(position);
      });
      this.watchId = navigator.geolocation.watchPosition((position) => {
        this.appendLocation(position);
      });
    } else {
      console.log('Geolocation API not supported.');
    }
  }

  appendLocation(location: GeolocationPosition) {
    this.currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }
}