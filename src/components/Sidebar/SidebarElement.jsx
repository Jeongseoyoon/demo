import { Link } from 'react-router-dom';

import { cn } from '../../utils';

const SidebarElement = ({ title, icon, path, selected = false }) => {
  return (
    <li
      className={cn('h-8 w-full cursor-pointer rounded px-2', {
        'bg-bg-transparent_gray [&_path]:stroke-text-primary [&_span]:text-text-primary': selected
      })}
    >
      <Link
        to={path}
        className={cn(
          'flex h-full w-full flex-row items-center gap-2',
          '[&_path]:stroke-text-secondary ',
          '[&>svg]:h-4 [&>svg]:w-4'
        )}
      >
        {icon}
        <span className="text-body2 font-medium text-text-secondary">{title}</span>
      </Link>
    </li>
  );
};

export default SidebarElement;
