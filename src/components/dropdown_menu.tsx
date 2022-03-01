import { For, createSignal, onCleanup, onMount, Show } from 'solid-js';

import { LabelValuePair } from 'src/app_types';

import { Button } from './button';

export type DropDownProps<T = unknown> = {
  defaultItem: LabelValuePair<T>;
  menuItems: ReadonlyArray<LabelValuePair<T> & { actionSymbol?: string }>;
  onSelect: (arg0: T) => void;
};

export type DropDownMenuProps<T> = Omit<DropDownProps<T>, 'defaultItem'> & {
  closeMenu: () => void;
  isMenuOpen: boolean;
};

const DropDownMenu = <T extends string>(props: DropDownMenuProps<T>) => {
  function key_press(e) {
    const { keyCode } = e;
    const foundCode = props.menuItems.find(
      ({ actionSymbol }) => actionSymbol?.substring(0, 1).charCodeAt(0) === keyCode
    );

    if (foundCode) {
      props.onSelect(foundCode.value);
    }
  }

  onMount(() => {
    document.addEventListener('keyup', key_press);
  });

  onCleanup(() => {
    document.removeEventListener('keyup', key_press);
  });

  return (
    <Show when={props.isMenuOpen}>
      <div id="SHARED_DROPDOWN_MENU" class="shared-dropdown-menu" role="menu" tabIndex={0}>
        <div class="dropdown-menu">
          <div class="dropdown-menu-item_wrappers">
            <ul class="dropdown-menu-list">
              <For each={props.menuItems}>
                {({ label, value, actionSymbol }) => (
                  <li onClick={() => props.onSelect(value)}>
                    <div class="menu-item">
                      <div class="menu-item-name">{label}</div>
                      <div class="menu-item-action">{actionSymbol}</div>
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
    </Show>
  );
};

export function DropDown<T extends string>(props: DropDownProps<T>) {
  const [selectedItem, setSelectedItem] = createSignal(props.defaultItem?.label || '');
  const [isMenuOpen, setMenuOpen] = createSignal(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function componentOnSelect(v: T) {
    props.onSelect(v);
    setSelectedItem(() => v);
    closeMenu();
  }

  return (
    <>
      <Show when={isMenuOpen()}>
        <div class="shared-dropdown-menu-outside-click" onClick={closeMenu} />
      </Show>
      <div class="shared-dropdown-wrapper">
        <Button
          class={`shared-dropdown-button ${isMenuOpen() ? 'disabled-button' : ''}`}
          onClick={() => setMenuOpen(!isMenuOpen())}
        >
          {selectedItem()?.toLowerCase()}
          <span class="triangle" />
        </Button>
        <DropDownMenu<T>
          {...{
            onSelect: componentOnSelect,
            isMenuOpen: isMenuOpen(),
            menuItems: props.menuItems,
            closeMenu,
          }}
        />
      </div>
    </>
  );
}
