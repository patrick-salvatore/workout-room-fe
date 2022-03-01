import { useGlobalUiContext } from '@providers/global_ui';
import { Component } from 'solid-js';

const SideNavToggle = (props: { isOpen: boolean; toggleSideNav: VoidFunction }) => (
  <div data-testid="clickElm" class="icon__wrapper">
    <div class="sidebar-btn__wrapper">
      {props.isOpen ? (
        <svg
          onClick={props.toggleSideNav}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          class="icon"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      ) : (
        <svg
          onClick={props.toggleSideNav}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          class="icon"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      )}
    </div>
  </div>
);

const SideNav = () => {
  const [uiState, { toggleGobalNavigation }] = useGlobalUiContext();

  return (
    <div
      class={`navigation__context navigation__context-${
        uiState().isNavigationOpen ? 'opened' : 'closed'
      }`}
    >
      <SideNavToggle toggleSideNav={toggleGobalNavigation} isOpen={uiState().isNavigationOpen} />
    </div>
  );
};

export const NavBarContainer: Component = () => (
  <nav class="navigation">
    <div class="navigation__global">
      <div class="logo__wrapper" />
    </div>
    <SideNav />
  </nav>
);
