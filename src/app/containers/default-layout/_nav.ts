import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' }
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
    name: 'Offre',
    url: '/admin/offre',
    iconComponent: { name: 'cil-basket' }
  }
];
