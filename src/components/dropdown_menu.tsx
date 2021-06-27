import React from 'react';

import { LabelValuePair } from 'src/app_types';
import { capitalize } from '@helpers/index';
import { Button } from './button';

export type DropDownProps<T = unknown> = {
  defaultItem: LabelValuePair<T> | null;
  menuItems: ReadonlyArray<LabelValuePair<T> & { actionSymbol?: string }>;
  onSelect: (arg0: T) => void;
};

export type DropDownMenuProps<T> = Omit<DropDownProps<T>, 'defaultItem'> & {
  isMenuOpen: boolean;
  closeMenu: () => void;
};

const COMPONENT_IDENTIFIER = 'shared-dropdown-menu-component';

const DropDownMenu = <T extends string>({
  isMenuOpen,
  menuItems,
  closeMenu,
  onSelect,
}: DropDownMenuProps<T>) => {
  React.useEffect(() => {
    const _closeMenu = (e: MouseEvent) => {
      if ((e.target as Element).closest(`#${COMPONENT_IDENTIFIER}`)) return;
      closeMenu();
    };

    document.addEventListener('click', _closeMenu);
    return () => {
      document.removeEventListener('click', _closeMenu);
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const keyPress = e => {
      const { keyCode } = e;
      const foundCode = menuItems
        .map(({ actionSymbol, value }) => ({
          code: actionSymbol?.substring(0, 1).charCodeAt(0),
          value,
        }))
        .find(({ code }) => code === keyCode);

      if (foundCode) {
        onSelect(foundCode.value);
      }
    };

    document.addEventListener('keyup', keyPress);
    return () => document.removeEventListener('keyup', keyPress);
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div className="shared-dropdown-menu" role="menu" tabIndex={0} data-back-to-cancel="false">
          <div className="dropdown-menu">
            <div className="dropdown-menu-item_wrappers">
              <ul className="dropdown-menu-list">
                {menuItems.map(({ label, value, actionSymbol }, i) => (
                  <li key={i} onClick={() => onSelect(value)}>
                    <div className="menu-item">
                      <div className="menu-item-name">{label}</div>
                      <div className="menu-item-action">{actionSymbol}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const DropDown = <T extends string>({
  menuItems,
  defaultItem,
  onSelect,
}: DropDownProps<T>): JSX.Element => {
  const [selectedItem, setSelectedItem] = React.useState<string>(defaultItem?.label || '');
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const componentOnSelect = (v: T) => {
    setSelectedItem(v);
    onSelect(v);
    setMenuOpen(false);
  };

  return (
    <div className="shared-dropdown-wrapper" id={COMPONENT_IDENTIFIER}>
      <Button
        height={36}
        className={`shared-dropdown-button ${isMenuOpen ? 'disabled-button' : ''}`}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        {capitalize(selectedItem?.toLowerCase() || '')}
        <span className="triangle" />
      </Button>
      <DropDownMenu<T>
        {...{
          onSelect: componentOnSelect,
          closeMenu: () => setMenuOpen(false),
          isMenuOpen,
          menuItems,
        }}
      />
    </div>
  );
};
