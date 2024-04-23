import { sideBarMenuList } from './sidebarUtils';

export const manageTabs = sideBarMenuList.find((menu) => menu.subMenuTitle === 'Admin')?.children ?? [];

export const groundStationGridColumns = [
  { title: 'Name', key: 'name', width: 120 },
  { title: 'City', key: 'city', width: 120 },
  { title: 'Latitude', key: 'latitude', width: 120 },
  { title: 'Longitude', key: 'longitude', width: 120 },
  { title: 'Altitude', key: 'altitude', width: 120 },
  { title: 'Provider', key: 'provider', width: 120 },
  { title: 'Status', key: 'status', width: 120 }
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
