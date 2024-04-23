import GetStartedButton from './GetStartedButton';
import { cn } from '../../utils';
import { Text } from '../../components';
import { AntennaIcon, Calendar2OutlineIcon, Plus2OutlineIcon, SatelliteIcon } from '../../assets/svgs';
import satelliteImg from '../../assets/satellite.png';

const bottomButtonMetadataList = [
  {
    icon: <Plus2OutlineIcon />,
    title: 'Register a Spacecraft',
    path: '/register-spacecraft',
    description: 'Identifying the duration of access and scheduling satellite access',
    hoverStyle: 'hover:bg-yellow/[0.08] hover:border-yellow/[0.8]'
  },
  {
    icon: <AntennaIcon />,
    title: 'Contact Profile',
    path: '/contact',
    description: 'Define contact configuration Manage where data will move during contact',
    hoverStyle: 'hover:bg-skyblue/[0.08] hover:border-skyblue/[0.8]'
  },
  {
    icon: <Calendar2OutlineIcon />,
    title: 'Schedule a Contact',
    path: '/schedule-contact',
    description: 'Scheduling satellite access time to communicate with the spacecraft at the ground station',
    hoverStyle: 'hover:bg-indigo/[0.08] hover:border-indigo/[0.8]'
  },
  {
    icon: <SatelliteIcon />,
    title: 'Registered Spacecraft',
    path: '/registered-spacecraft',
    description: `Check and access to the\nregistered spacecraft`,
    hoverStyle: 'hover:bg-black/[0.08] hover:border-black/[0.8]'
  }
];

const GetStarted = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <div className={cn('flex h-[506px] flex-col items-center justify-center gap-6', 'md:flex-1')}>
        <img src={satelliteImg} alt="satellite-img" className="h-200 object-contain" />
        <div className={cn('w-full', 'md:w-[800px]')}>
          <h2 className="mb-3 text-center align-middle text-heading1 font-semibold text-text-primary">Get Started</h2>
          <Text
            className="text-center"
            weight="regular"
            size="body2"
            color="secondary"
            text=" Use the IOPs Ground Station to communicate with satellites and communicate IOPs Ground Station with wireless
            or satellite observations, and to downlink data."
          />
        </div>
      </div>
      <div className={cn('grid grid-cols-1 grid-rows-4 gap-2', 'md:h-1/2 md:grid-cols-2 md:grid-rows-2 ')}>
        {bottomButtonMetadataList.map((metadata) => (
          <GetStartedButton key={metadata.title} className={metadata.hoverStyle} {...metadata} />
        ))}
      </div>
    </div>
  );
};

export default GetStarted;
