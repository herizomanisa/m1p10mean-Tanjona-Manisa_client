import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { DefaultLayoutClientComponent } from './containers';
import { DefaultLayoutEmployeComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { ClientLoginComponent } from './views/pages/client-login/client-login.component';
import { EmployeLoginComponent } from './views/pages/employe-login/employe-login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ClientRegisterComponent } from './views/pages/client-register/client-register.component';

import {
  canActivate,
  canActivateClient,
  canActivateEmploye,
} from './services/guard/auth_guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'client/login',
    component: ClientLoginComponent,
    data: {
      title: 'Client Login Page',
    },
  },
  {
    path: 'employe/login',
    component: EmployeLoginComponent,
    data: {
      title: 'Employe Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'client/register',
    component: ClientRegisterComponent,
    data: {
      title: 'Client Register Page',
    },
  },

  // Admin route
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },

  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate: [canActivate],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },

  // client route

  {
    path: '',
    component: DefaultLayoutClientComponent,
    canActivate: [canActivateClient],
    data: {
      expectedRole: 'customer',
      title: 'Home',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/service/service.module').then((m) => m.ServiceModule),
      },
      {
        path: 'rendezvous-form',
        loadChildren: () =>
          import('./views/rendezvous-form/rendezvous-form.module').then(
            (m) => m.RendezvousFormModule
          ),
      },
      {
        path: 'rendezvous-story',
        loadChildren: () =>
          import('./views/rendezvous-story/rendezvous-story.module').then(
            (m) => m.RendezvousStoryModule
          ),
      },
      {
        path: 'rendezvous-my-list',
        loadChildren: () =>
          import('./views/rendezvous-my-list/rendezvous-my-list.module').then(
            (m) => m.RendezvousMyListModule
          ),
      },
      {
        path: 'employe-list',
        loadChildren: () =>
          import('./views/employe-client-list/employe-client-list.module').then(
            (m) => m.EmployeClientListModule
          ),
      },
      {
        path: 'preference',
        loadChildren: () =>
          import('./views/preference/preference.module').then(
            (m) => m.PreferenceModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/client/client.module').then(
            (m) => m.ClientModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  // client route

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },

  // Employe route
  {
    path: 'employe',
    redirectTo: 'employe',
    pathMatch: 'full',
  },

  {
    path: 'employe',
    component: DefaultLayoutEmployeComponent,
    canActivate: [canActivateEmploye],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/employe/employe.module').then((m) => m.EmployeModule),
      },
    ],
  },

  // {
  //   path: '',
  //   component: DefaultLayoutClientComponent,
  //   canActivate: [canActivateClient],
  //   data: {
  //     expectedRole: 'customer',
  //     title: 'Home',
  //   },
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./views/service/service.module').then((m) => m.ServiceModule),
  //     },
  //     {
  //       path: 'rendezvous-form',
  //       loadChildren: () =>
  //         import('./views/rendezvous-form/rendezvous-form.module').then(
  //           (m) => m.RendezvousFormModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
