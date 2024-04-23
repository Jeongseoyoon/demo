export const scheduleGridFilter = [
  {
    label: 'Spacecraft',
    key: 'spacecraft',
    placeholder: 'Select Spacecraft',
    type: 'selectbox',
    list: ['AQUA', 'SpaceCraft 1', 'SpaceCraft 2', 'SpaceCraft 3'],
    className: 'col-span-1'
  },
  {
    label: 'Contacts (Ground Station)',
    key: 'groundStation',
    placeholder: 'Select Contacts',
    type: 'selectbox',
    list: ['SEOUL', 'DAEJEON', 'DAEGU', 'ULSAN', 'BUSAN', 'GWANGJU', 'INCHEON'],
    className: 'col-span-1'
  },
  {
    label: 'Date',
    key: 'date',
    placeholder: '',
    type: 'date',
    className: 'col-span-2'
  }
];

export const scheduleGridColumns = [
  { title: 'Spacecraft', key: 'spacecraft', width: 120 },
  { title: 'Ground Station', key: 'groundStation', width: 120 },
  { title: 'Available time', key: 'availableTime', width: 160 },
  { title: 'Start Time', key: 'startTime', width: 160 },
  { title: 'End Time', key: 'endTime', width: 160 },
  { title: 'Highest Altitude (Degree)', key: 'degree' }
];

export const scheduleGridData = Array.from({ length: Math.round(Math.random() * 20) }, () => ({
  spacecraft: scheduleGridFilter[0].list?.[Math.round(Math.random() * 3)] || 'AQUA',
  groundStation: scheduleGridFilter[1].list?.[Math.round(Math.random() * 7)] || 'AQUA',
  availableTime: `${Math.round(Math.random() * 500)} mins`,
  startTime: `2024/04/${Math.round(Math.random() * 10 + 10)} ${Math.round(Math.random() * 24)
    .toString()
    .padStart(2, '0')}:00:00`,
  endTime: `2024/04/${Math.round(Math.random() * 10 + 10)} ${Math.round(Math.random() * 24)
    .toString()
    .padStart(2, '0')}:20:00`,
  degree: `${Math.round(Math.random() * 360)}º`,
  price: Math.round(Math.random() * 100)
}));
// GridColumns 에 존재하는 Column 만 출력되므로 price 정보는 grid 에서 숨김처리

export const contactGridColumns = [
  { title: 'Spacecraft', key: 'spacecraft', width: 120 },
  { title: 'Ground Station', key: 'groundStation', width: 120 },
  { title: 'Available time', key: 'availableTime', width: 160 },
  { title: 'Start Time', key: 'startTime', width: 160 },
  { title: 'End Time', key: 'endTime', width: 160 },
  { title: 'Highest Altitude (Degree)', key: 'degree', width: 180 },
  { title: 'Status', key: 'status' },
  { title: '', key: 'cancelStatus' }
];

export const contactGridStatus = {
  idle: { title: 'Idle', className: 'bg-white border-black text-black' },
  done: { title: 'Done', className: 'bg-[#E6F2FE] border-[#0890F3] text-[#0890F3]' },
  progress: { title: 'In Progress', className: 'bg-[#E6FEED] border-[#27B72D] text-[#27B72D]' },
  cancel: { title: 'Cancel', className: 'bg-white border-#8F8F8F text-#8F8F8F' },
  fail: { title: 'Fail', className: 'bg-[#FEE6E6] border-[#F30808] text-[#F30808]' }
};

export const contactGridData = Array.from({ length: Math.round(Math.random() * 20) }, () => ({
  spacecraft: scheduleGridFilter[0].list?.[Math.round(Math.random() * 3)] || 'AQUA',
  groundStation: scheduleGridFilter[1].list?.[Math.round(Math.random() * 7)] || 'AQUA',
  availableTime: `${Math.round(Math.random() * 500)} mins`,
  startTime: `2024/04/${Math.round(Math.random() * 10 + 10)} ${Math.round(Math.random() * 24)
    .toString()
    .padStart(2, '0')}:00:00`,
  endTime: `2024/04/${Math.round(Math.random() * 10 + 10)} ${Math.round(Math.random() * 24)
    .toString()
    .padStart(2, '0')}:20:00`,
  degree: `${Math.round(Math.random() * 360)}º`,
  status: Object.keys(contactGridStatus)[Math.round(Math.random() * 4)] || 'idle',
  cancelStatus: ['Cancel', 'To be refunded', 'Refunded'][Math.round(Math.random() * 2)] || 'Cancel',
  isCancelStatusDisabled: [true, false][Math.round(Math.random() * 1)]
}));

export const registeredGridColumns = [
  { title: 'Name', key: 'name', width: 120 },
  { title: 'Norad ID', key: 'noradId', width: 160 },
  { title: 'TLE - Title Line', key: 'tleTitle', width: 160 },
  { title: 'Registered At', key: 'createdDate', width: 250 },
  { title: '', key: 'viewDetails' }
];

export const registeredGridData = Array.from({ length: Math.round(Math.random() * 20) }, () => ({
  name: 'AQUA',
  noradId: '25452',
  tleTitle: 'AQUA',
  createdDate: `2024/04/${Math.round(Math.random() * 10 + 10)} ${Math.round(Math.random() * 24)
    .toString()
    .padStart(2, '0')}:00:00`
}));

export const registeredModalList = [
  { title: 'Subscription', key: 'subscription' },
  { title: 'NORAD ID', key: 'id' },
  { title: 'TLE - Title Line', key: 'titleLine' },
  { title: 'TLE - Line 1', key: 'line1' },
  { title: 'TLE - Line 2', key: 'line2' },
  { title: 'Direction', key: 'direction' },
  { title: 'Center frequency (MHz)', key: 'frequency' }
];

export const addGroundStationModalList = [
  { title: 'name', key: 'subscription' },
  { title: 'city', key: 'id' },
  { title: 'latitude', key: 'titleLine' },
  { title: 'longitude', key: 'line1' },
  { title: 'altitude', key: 'line2' },
  { title: 'Dprovider', key: 'direction' },
  { title: 'status', key: 'frequency' }
];
