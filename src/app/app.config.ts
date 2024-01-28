import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)), provideClientHydration(), provideAnimations(), provideAnimations(), provideHttpClient(withFetch())]
};
