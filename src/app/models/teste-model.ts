export interface DynimicDashboardCard {
  id: string;
  endpoint: string;
  title: string;
  infoText?: string;
  route?: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  background: string;
  hoverBackground: string;
  loading?: boolean;
  info: any;
  canShow: boolean;
}
