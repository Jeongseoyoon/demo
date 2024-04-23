import { useLocation } from 'react-router-dom';

import { Button } from '../Button';
import SidebarElement from './SidebarElement';

import { cn, sideBarMenuList } from '../../utils';
import { useClickOutside } from '../../hooks/useClickOutside';

import logoImg from '../../assets/logo.png';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { pathname } = useLocation();
  const { ref } = useClickOutside(onClickOutside);

  function onClickOutside() {
    setIsSidebarOpen(false);
  }

  return (
    <nav
      className={cn(
        'shadow-sidebar absolute z-10 h-full w-60 min-w-60 max-w-60 bg-bg-inner py-2.5 pl-[18px] pr-3.5 transition-transform',
        { 'shadow-sidebar translate-x-0': isSidebarOpen, 'translate-x-[-240px] shadow-none': !isSidebarOpen },
        'md:static md:translate-x-0 md:bg-bg-main md:py-0 md:pl-2 md:pr-1 md:shadow-none'
      )}
      ref={ref}
    >
      <div className="mb-2 flex flex-row items-center justify-between py-[9px] pl-2">
        <img src={logoImg} className="h-[30px] w-[90px]" alt="iops-logo" />
        <Button text="Log In" type="secondary" size="small" />
      </div>
      <ul className="flex h-fit w-full flex-col gap-4 py-3">
        {sideBarMenuList.map((menu) => {
          if (menu.subMenuTitle) {
            return (
              <li key={menu.subMenuTitle}>
                <div className="mb-1 h-8 w-full px-2">
                  <span className="text-text-tertiary">{menu.subMenuTitle}</span>
                </div>
                <ul className="flex w-full flex-col gap-1">
                  {menu.children.map((subMenu) => (
                    <SidebarElement key={subMenu.title} {...subMenu} selected={subMenu.path === pathname} />
                  ))}
                </ul>
              </li>
            );
          }
          return <SidebarElement key={menu.title} {...menu} selected={menu.path === pathname} />;
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
