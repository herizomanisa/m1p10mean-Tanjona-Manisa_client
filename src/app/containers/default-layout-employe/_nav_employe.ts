import { INavData } from '@coreui/angular';

export const navItemsEmploye: INavData[] = [
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
