import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import {
  initializeApp as initializeAppRaw,
  getApp as getRawApp,
} from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { environment } from './environments/environment';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const firebaseApp = initializeAppRaw(environment.firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideFirebaseApp(() => getRawApp()),
    provideFirestore(() =>
      initializeFirestore(getRawApp(), {
        experimentalAutoDetectLongPolling: true,
      })
    ),
  ],
});
