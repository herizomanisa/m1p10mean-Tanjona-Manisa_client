import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/token.interceptor';
import { errorInterceptor } from './services/error.interceptor';
import { provideToastr } from 'ngx-toastr'
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(HttpClientModule)]
  providers: [provideRouter(routes),
              provideClientHydration(), 
              provideToastr(),
              // provideAnimations(),
              // provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor]))
            ]
};
