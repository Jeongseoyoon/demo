import axios from 'axios';
export const scheduleGridFilter = [
  {
    label: 'Spacecraft',
    key: 'spacecraft',
    placeholder: 'Select Spacecraft',
    type: 'selectbox',
    list: (await axios.get(`http://localhost:8080/api/link/listAll`)).data.map((item) => ({
      id: item.id,
      text: item.name
    })),
    className: 'col-span-1'
  },
  {
    label: 'Contacts (Ground Station)',
    key: 'groundStation',
    placeholder: 'Select Contacts',
    type: 'selectbox',
    list: (await axios.get(`http://localhost:8080/api/contactprofile/listAll`)).data.map((item) => ({
      id: item.id,
      text: item.name
    })),
    className: 'col-span-1'
  },
  {
    label: 'StartDate',
    key: 'startdate',
    placeholder: '',
    type: 'date',
    className: 'col-span-1'
  },
  {
    label: 'EndDate',
    key: 'enddate',
    placeholder: '',
    type: 'date',
    className: 'col-span-1'
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
  1: { title: 'Idle', className: 'bg-white border-black text-black' },
  2: { title: 'In Progress', className: 'bg-[#E6FEED] border-[#27B72D] text-[#27B72D]' },
  3: { title: 'Done', className: 'bg-[#E6F2FE] border-[#0890F3] text-[#0890F3]' },
  4: { title: 'Fail', className: 'bg-[#FEE6E6] border-[#F30808] text-[#F30808]' },
  5: { title: 'Cancel', className: 'bg-white border-#8F8F8F text-#8F8F8F' }
};

// 20240424 CancelStatus 추가 -유인식
export const contactGridCancelStatus = {
  1: { text: 'Cancel' },
  2: { text: 'To be refunded' },
  3: { text: 'Refunded' }
};

export const registeredGridColumns = [
  { title: 'Name', key: 'name', width: 180 },
  { title: 'Norad ID', key: 'noradId', width: 160 },
  { title: 'Direction', key: 'direction', width: 120 },
  { title: 'TLE - Title Line', key: 'titleLine', width: 160 },
  { title: 'Registered At', key: 'registeredAt', width: 250 },
  { title: '', key: 'viewDetails' }
];

// 20240425 교신프로필 컬럼 추가 - 정서윤
export const contactProfileGridColumns = [
  { title: 'Name', key: 'name', width: 180 },
  { title: 'Ground Station', key: 'city', width: 170 },
  { title: 'Minimum viable Contact duration', key: 'minContactDuration', width: 270 },
  { title: 'Minimum elevation in degrees', key: 'minElevationDegrees', width: 250 },
  { title: 'Registered At', key: 'createdDate', width: 200 },
  { title: '', key: 'viewDetails' }
];

// 20240425 교신프로필 상세보기 컬럼 추가 - 정서윤
export const contactProfileModalList = [
  { title: 'Ground Station ', key: 'city' },
  { title: 'Location', key: 'location' },
  { title: 'Minimum viable Contact duration', key: 'minContactDuration' },
  { title: 'Minimum elevation in degrees', key: 'minElevationDegrees' },
  { title: 'Auto Tracking Frequency Band', key: 'autoTrackingFrequencyBand' },
  { title: 'Registered At', key: 'createdDate' }
];

export const registeredGridData = Array.from({ length: Math.round(Math.random() * 20) }, () => ({
  name: 'AQUA',
  direction: ['Downlink', 'Test 1', 'Test 5'][Math.round(Math.random() * 2)] || 'Downlink',
  noradId: '25452',
  titleLine: 'AQUA',
  registeredAt: `2024/04/${Math.round(Math.random() * 10 + 10)} ${Math.round(Math.random() * 24)
    .toString()
    .padStart(2, '0')}:00:00`
}));

export const registeredModalList = [
  { title: 'NORAD ID', key: 'noradId' },
  { title: 'TLE - Title Line', key: 'titleLine' },
  { title: 'TLE - Line 1', key: 'tleFirst' },
  { title: 'TLE - Line 2', key: 'tleSecond' },
  { title: 'Direction', key: 'direction' },
  { title: 'Center frequency (MHz)', key: 'frequency' },
  { title: 'Bandwidth (MHz)', key: 'bandwidth' },
  { title: 'Polarization', key: 'polarization' }
];
