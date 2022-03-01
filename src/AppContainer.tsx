import { NavBarContainer } from '@components/navigation';
import { Component } from 'solid-js';
import { useGlobalUiContext } from './providers/global_ui';

export const AppContainer: Component = props => {
  const [uiState] = useGlobalUiContext();

  return (
    <>
      <NavBarContainer />
      <div
        class={`app--container compressable-container ${
          uiState().isNavigationOpen ? 'compressed' : ''
        }`}
      >
        {props.children}
      </div>
    </>
  );
};
