import { INavData } from '@coreui/angular';

export const navItemsEmploye: INavData[] = [
  {
    name: 'Rendez-vous',
    url: '/employe',
    iconComponent: { name: 'cil-calendar' },
  },
  {
    name: 'Mon profil',
    url: '/employe/profil',
    iconComponent: { name: 'cil-people' },
  },
  //   {
  //     name: 'Rendez-vous',
  //     iconComponent: { name: 'cil-calendar' },
  //     children: [
  //       {
  //         name: 'Mes RDV',
  //         url: '/employe/my-list',
  //       },
  //       {
  //         name: 'Non assignés',
  //         url: '/employe/no-employe',
  //       },
  //     ],
  //   },
];
