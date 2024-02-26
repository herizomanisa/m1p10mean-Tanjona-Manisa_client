import { INavData } from '@coreui/angular';

export const navItemsClient: INavData[] = [
  {
    name: 'Liste des services',
    url: '/',
    iconComponent: { name: 'cil-calculator' },
  },
  {
    name: 'Liste des employés',
    url: '/',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Mes rendez-vous',
    url: '/',
    iconComponent: { name: 'cil-calendar' },
  },
  {
    name: 'Préférence',
    url: '/preference',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Services',
        url: '/preference/service',
      },
      {
        name: 'Employés',
        url: '/preference/employe',
      },
    ],
  },
];
