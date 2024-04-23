import { useLocation } from 'react-router-dom';

import { cn, getPathToTitleObj } from '../../utils';
import { MenuIcon } from '../../assets/svgs';

const Header = ({ setIsSidebarOpen }) => {
  const { pathname } = useLocation();
  const pathToTitleObj = getPathToTitleObj();

  function onClickOpenSidebar() {
    setIsSidebarOpen(true);
  }

  return (
    <header className={cn('flex flex-row items-center border-b border-border-dimmed p-3', 'md:px-6')}>
      <button
        type="button"
        className={cn(
          'mr-2 flex h-6 w-6 flex-row items-center justify-center rounded border border-border-primary bg-button-bg_secondary text-button-text_secondary',
          'md:hidden'
        )}
        onClick={onClickOpenSidebar}
      >
        <MenuIcon />
      </button>
      <h1 className="text-header font-semibold">{pathToTitleObj[pathname]}</h1>
    </header>
  );
};

export default Header;
