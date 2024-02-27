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
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/admin/theme/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Typography',
    url: '/admin/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Base',
    url: '/admin/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/admin/base/accordion'
      },
      {
        name: 'Breadcrumbs',
        url: '/admin//base/breadcrumbs'
      },
      {
        name: 'Cards',
        url: '/admin//base/cards'
      },
      {
        name: 'Carousel',
        url: '/admin//base/carousel'
      },
      {
        name: 'Collapse',
        url: '/admin//base/collapse'
      },
      {
        name: 'List Group',
        url: '/admin//base/list-group'
      },
      {
        name: 'Navs & Tabs',
        url: '/admin//base/navs'
      },
      {
        name: 'Pagination',
        url: '/admin//base/pagination'
      },
      {
        name: 'Placeholder',
        url: '/admin//base/placeholder'
      },
      {
        name: 'Popovers',
        url: '/admin//base/popovers'
      },
      {
        name: 'Progress',
        url: '/admin//base/progress'
      },
      {
        name: 'Spinners',
        url: '/admin//base/spinners'
      },
      {
        name: 'Tables',
        url: '/admin//base/tables'
      },
      {
        name: 'Tabs',
        url: '/admin//base/tabs'
      },
      {
        name: 'Tooltips',
        url: '/admin//base/tooltips'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/admin/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/admin//buttons/buttons'
      },
      {
        name: 'Button groups',
        url: '/admin//buttons/button-groups'
      },
      {
        name: 'Dropdowns',
        url: '/admin//buttons/dropdowns'
      }
    ]
  },
  {
    name: 'Forms',
    url: '/admin/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/admin//forms/form-control'
      },
      {
        name: 'Select',
        url: '/admin//forms/select'
      },
      {
        name: 'Checks & Radios',
        url: '/admin//forms/checks-radios'
      },
      {
        name: 'Range',
        url: '/admin//forms/range'
      },
      {
        name: 'Input Group',
        url: '/admin//forms/input-group'
      },
      {
        name: 'Floating Labels',
        url: '/admin//forms/floating-labels'
      },
      {
        name: 'Layout',
        url: '/admin//forms/layout'
      },
      {
        name: 'Validation',
        url: '/admin//forms/validation'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/admin/charts',
    iconComponent: { name: 'cil-chart-pie' }
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/admin//icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/admin//icons/flags'
      },
      {
        name: 'CoreUI Brands',
        url: '/admin//icons/brands'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/admin/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/admin//notifications/alerts'
      },
      {
        name: 'Badges',
        url: '/admin//notifications/badges'
      },
      {
        name: 'Modal',
        url: '/admin//notifications/modal'
      },
      {
        name: 'Toast',
        url: '/admin//notifications/toasts'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/admin/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'py-0'
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
