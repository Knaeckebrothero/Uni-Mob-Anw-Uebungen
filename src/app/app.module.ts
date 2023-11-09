import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CameraMicrophoneComponent } from './uebung-2-camera-microphone/uebung-2-camera-microphone.component';
import { Uebung3LocationComponent } from './uebung-3-location/uebung-3-location.component';

// Navigation bar imports
import { NavigationBarComponent } from './navbar/navigation-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


	// Routes
	const routes: Routes = [
	  { path: '', component: CameraMicrophoneComponent },
	  { path: '/uebung3', component: Uebung3LocationComponent }
	];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CameraMicrophoneComponent,
    Uebung3LocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    RouterModule,
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
