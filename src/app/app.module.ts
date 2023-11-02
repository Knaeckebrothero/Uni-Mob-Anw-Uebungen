import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navbar/navigation-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DevsCoffeeComponent } from './devs-coffee/devs-coffee.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CameraMicrophoneComponent } from './camera-microphone/camera-microphone.component';

// Routes
const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'devs-coffee', component: DevsCoffeeComponent },
  { path: 'camera-microphone', component: CameraMicrophoneComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LandingpageComponent,
    DevsCoffeeComponent,
    CameraMicrophoneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
