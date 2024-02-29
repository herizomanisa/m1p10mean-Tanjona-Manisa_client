import { INavData } from '@coreui/angular';

export const navItemsClient: INavData[] = [
  {
    name: 'Prendre rendez-vous',
    url: '/rendezvous-form',
    iconComponent: { name: 'cil-pencil' },
  },
  {
    name: 'Liste des services',
    url: '',
    iconComponent: { name: 'cil-calculator' },
  },
  {
    name: 'Liste des employés',
    url: '/employe-list',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Rendez-vous',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'Mes rendez-vous',
        url: '/rendezvous-my-list',
      },
      {
        name: 'Historique',
        url: '/rendezvous-story',
      },
    ],
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
  {
    name: 'Notification',
    url: '/notification',
    iconComponent: { name: 'cil-calendar' },
  },
];
