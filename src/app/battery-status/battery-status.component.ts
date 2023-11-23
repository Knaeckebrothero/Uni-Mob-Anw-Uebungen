import { Component, OnInit } from '@angular/core';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener(type: string, listener: (this: BatteryManager, ev: Event) => any, options?: boolean | AddEventListenerOptions): void;
}

@Component({
  selector: 'app-battery-status',
  templateUrl: './battery-status.component.html',
  styleUrls: ['./battery-status.component.scss']
})
export class BatteryStatusComponent implements OnInit {

  chargingStatus: string = 'unknown';
  chargingTime: string = 'unknown';
  dischargingTime: string = 'unknown';
  batteryLevel: string = 'unknown';
  batteryUpdates: string[] = [];
  batteryLevelBar: string = '0%';

  constructor() { }

  ngOnInit(): void {
    this.getBatteryStatus();
  }

  private getBatteryStatus() {
    const batteryPromise = ('getBattery' in navigator) ? (navigator as any).getBattery() as Promise<BatteryManager> : Promise.resolve((navigator as any).battery as BatteryManager);

    batteryPromise.then(battery => {
      this.updateInitialStatus(battery);

      battery.addEventListener('chargingchange', () => this.onChargingChange(battery));
      battery.addEventListener('chargingtimechange', () => this.onChargingTimeChange(battery));
      battery.addEventListener('dischargingtimechange', () => this.onDischargingTimeChange(battery));
      battery.addEventListener('levelchange', () => this.onLevelChange(battery));
    });
  }

  private updateInitialStatus(battery: BatteryManager) {
    this.chargingStatus = battery.charging ? 'charging' : 'discharging';
    this.chargingTime = battery.chargingTime + ' s';
    this.dischargingTime = battery.dischargingTime + ' s';
    this.batteryLevel = (battery.level * 100).toFixed(2);
    this.batteryLevelBar = `${this.batteryLevel}%`; // Update the bar width
  }

  private handleChange(change: string) {
    const timeBadge = new Date().toTimeString().split(' ')[0];
    this.batteryUpdates.push(`${timeBadge} ${change}`);
  }

  private onChargingChange(battery: BatteryManager) {
    this.handleChange(`Battery charging changed to ${battery.charging ? 'charging' : 'discharging'}`);
  }

  private onChargingTimeChange(battery: BatteryManager) {
    this.handleChange(`Battery charging time changed to ${battery.chargingTime} s`);
  }

  private onDischargingTimeChange(battery: BatteryManager) {
    this.handleChange(`Battery discharging time changed to ${battery.dischargingTime} s`);
  }

  private onLevelChange(battery: BatteryManager) {
    this.handleChange(`Battery level changed to ${battery.level}`);
  }
}
