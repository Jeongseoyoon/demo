/*
	title: 메뉴명
	path: 경로
	icon: 아이콘 컴포넌트

	subMenuTitle: 서브메뉴 목록 명
	children: 서브메뉴 목록
*/

import {
  CalendarOutlineIcon,
  ChartBarOutlineIcon,
  ChartPieOutlineIcon,
  ChatAltOutlineIcon,
  ClipboardOutlineIcon,
  CreditCardOutlineIcon,
  GlobeAltOutlineIcon,
  HomeOutlineIcon,
  PlusOutlineIcon,
  QuestionMarkCircleOutlineIcon,
  SatelliteIcon,
  TagOutlineIcon,
  UserOutlineIcon,
  ViewGridOutlineIcon
} from '../assets/svgs';

export const sideBarMenuList = [
  {
    title: 'About IGS',
    path: '/about',
    icon: <HomeOutlineIcon />
  },
  {
    subMenuTitle: 'Pricing',
    children: [
      {
        title: 'Pricing',
        path: '/pricing',
        icon: <CreditCardOutlineIcon />
      },
      {
        title: 'Calculator',
        path: '/calculator',
        icon: <ChartPieOutlineIcon />
      },
      {
        title: 'Promotion',
        path: '/promotion',
        icon: <TagOutlineIcon />
      }
    ]
  },
  {
    subMenuTitle: 'Schedule',
    children: [
      { title: 'Get Started', path: '/get-started', icon: <ViewGridOutlineIcon /> },
      { title: 'Register A Spacecraft', path: '/register-spacecraft', icon: <PlusOutlineIcon /> },
      { title: 'Contact Profile', path: '/contact-profile', icon: <ClipboardOutlineIcon /> },
      { title: 'Schedule a Contact', path: '/schedule-contact', icon: <CalendarOutlineIcon /> },
      { title: 'Manage Contacts', path: '/manage-contacts', icon: <ChartBarOutlineIcon /> },
      { title: 'Registered SpaceCraft', path: '/registered-spacecraft', icon: <SatelliteIcon /> }
    ]
  },
  {
    subMenuTitle: 'Support',
    children: [
      { title: 'FAQ', path: '/faq', icon: <QuestionMarkCircleOutlineIcon /> },
      { title: 'Contact Us', path: '/contact-us', icon: <ChatAltOutlineIcon /> }
    ]
  },
  {
    subMenuTitle: 'Admin',
    children: [
      { title: 'Manage Users', path: '/manage-users', icon: <UserOutlineIcon /> },
      { title: 'Manage Payment', path: '/manage-payment', icon: <CreditCardOutlineIcon /> },
      { title: 'Manage Promotion', path: '/manage-promotion', icon: <TagOutlineIcon /> },
      { title: 'Manage Ground Station', path: '/manage-ground-station', icon: <GlobeAltOutlineIcon /> }
    ],
    isAdmin: true
    // NOTE: Admin 전용 메뉴로 추정
  }
];
// NOTE: 해당 배열 내부 값 수정 시 src/pages/GetStarted/index.jsx 의 bottomButtonMetadataList 도 같이 수정해야함

export function getPathToTitleObj() {
  return sideBarMenuList.reduce((acc, cur) => {
    if (cur.children) {
      cur.children.forEach((child) => {
        acc[child.path] = child.title;
        return acc;
      });
    } else {
      acc[cur.path] = cur.title;
    }
    return acc;
  }, {});
}
