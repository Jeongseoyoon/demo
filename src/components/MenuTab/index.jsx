import classnames from 'classnames';

import { cn } from '../../utils';

const MenuTab = ({ menuList, selectedMenuIndex, onClickTab }) => {
  return (
    <div className="w-full">
      <div className={cn('flex w-full flex-row gap-4 px-4', 'md:px-6')}>
        {menuList.map((menu, index) => (
          <button
            key={`${menu}-${index}`}
            className={cn('flex w-fit min-w-40 items-center justify-center bg-bg-inner py-2 pb-2.5', 'md:px-4', {
              'border-b-2 border-button-bg_primary pb-2': index === selectedMenuIndex
            })}
            onClick={() => onClickTab(index)}
          >
            <span
              className={classnames(
                'text-nowrap text-body2 font-medium',
                {
                  'text-text-primary': index === selectedMenuIndex
                },
                {
                  'text-text-tertiary': index !== selectedMenuIndex
                }
              )}
            >
              {menu}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuTab;
