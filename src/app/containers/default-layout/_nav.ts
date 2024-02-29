import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Service',
    url: '/admin/service',
    iconComponent: { name: 'cil-layers' }
  },
  {
    name: 'Employe',
    url: '/admin/employe',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Benefice',
    url: '/admin/benefice',
    iconComponent: { name: 'cilDollar' }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/templates/installation',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank', class: '-text-dark' },
    class: 'mt-auto'
  },
  {
    name: 'Try CoreUI PRO',
    url: 'https://coreui.io/product/angular-dashboard-template/',
    iconComponent: { name: 'cil-layers' },
    attributes: { target: '_blank' }
  }
];
