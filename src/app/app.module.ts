import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from './navbar/navigation-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DevsHotCoffeeComponent } from './devs-hot-coffee/devs-hot-coffee.component';
import { AmateurPwasComponent } from './amateur-pwas/amateur-pwas.component';
import { GpsPositionsComponent } from './gps-positions/gps-positions.component';
import { HeadBarComponent } from './head-bar/head-bar.component';
import { OperatingSystemComponent } from './operating-system/operating-system.component';
import { NativeBehaviorsComponent } from './native-behaviors/native-behaviors.component';
import { BatteryStatusComponent } from './battery-status/battery-status.component';

// Routes
const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'devs-hot-coffee', component: DevsHotCoffeeComponent },
  { path: 'amateur-pwas', component: AmateurPwasComponent },
  { path: 'gps-positions', component: GpsPositionsComponent},
  { path: 'operating-system', component: OperatingSystemComponent},
  { path: 'native-behaviors', component: NativeBehaviorsComponent},
  { path: 'battery-status', component: BatteryStatusComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LandingpageComponent,
    DevsHotCoffeeComponent,
    AmateurPwasComponent,
    GpsPositionsComponent,
    HeadBarComponent,
    OperatingSystemComponent,
    NativeBehaviorsComponent,
    BatteryStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
