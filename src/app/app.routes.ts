import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'echart',
    loadComponent: () => import('./echart/echart.page').then( m => m.EchartPage)
  },
  {
    path: 'dashboard-sweb',
    loadComponent: () => import('./pages/dashboard-teste-sweb/dashboard-teste-sweb.page').then( m => m.DashboardTesteSwebPage)
  },
  {
    path: 'dashboard-ng2-charts',
    loadComponent: () => import('./pages/dashboard-ng2-charts/dashboard-ng2-charts.page').then( m => m.DashboardNg2ChartsPage)
  },
  {
    path: 'dashboard-google-charts',
    loadComponent: () => import('./pages/dashboard-google-charts/dashboard-google-charts.page').then( m => m.DashboardGoogleChartsPage)
  },
  {
    path: 'dash-inicial',
    loadComponent: () => import('./pages/gerente-vendas/dash-inicial/dash-inicial.page').then( m => m.DashInicialPage)
  },

];
