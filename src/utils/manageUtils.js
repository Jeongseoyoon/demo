import { sideBarMenuList } from './sidebarUtils';

export const manageTabs = sideBarMenuList.find((menu) => menu.subMenuTitle === 'Admin')?.children ?? [];

export const groundStationGridColumns = [
  { title: 'Name', key: 'name', width: 220 },
  { title: 'City', key: 'city', width: 120 },
  { title: 'Latitude', key: 'latitudeDegrees', width: 120 },
  { title: 'Longitude', key: 'longitudeDegrees', width: 120 },
  { title: 'Altitude', key: 'altitudeMeters', width: 120 },
  { title: 'Provider', key: 'providerName', width: 120 },
  { title: 'Status', key: 'status', width: 120 },
  { title: '', key: 'viewDetails' }
];

export const groundStationGridData = Array.from({ length: Math.round(Math.random() * 20) }, () => ({
  name: ['SEOUL', 'DAEJEON', 'DAEGU', 'GWANGJU'][Math.round(Math.random() * 3)] || 'DAEJEON',
  city: ['SEOUL', 'DAEJEON', 'DAEGU', 'GWANGJU'][Math.round(Math.random() * 3)] || 'DAEJEON',
  latitude: `${Math.round(Math.random() * 20 + 10)}º${Math.round(Math.random() * 20 + 10)}’${Math.round(Math.random() * 20 + 20)}”N`,
  longitude: `${Math.round(Math.random() * 20 + 10)}º${Math.round(Math.random() * 20 + 10)}’${Math.round(Math.random() * 20 + 20)}”E`,
  altitude: `${(Math.random() * 100).toFixed(2)}m`,
  provider: 'IOPS',
  status: 'In operation'
}));
