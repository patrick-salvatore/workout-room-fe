import React from 'react';
import { TGlobalUiContext, TGlobalUiContextMemo } from './types';

export type GlobalState = {
  isNavigationOpen: boolean;
};

export const toggleNavigationState = (payload = false) =>
  ({
    payload,
    type: 'global/TOGGLE_NAVIGATION',
  } as const);

export type GlobalStateActions = ReturnType<typeof toggleNavigationState>;

const globalInitialState = {
  isNavigationOpen: false,
};

const GlobalUiContext = React.createContext(globalInitialState);

export const GlobalUiProvider: React.FC = props => {
  const [globalUiState, setGlobalUiState] = React.useState<TGlobalUiContext>(globalInitialState);
  const { Provider } = GlobalUiContext;

  const toggleGobalNavigation = () =>
    setGlobalUiState({ isNavigationOpen: !globalUiState.isNavigationOpen });

  const globalUiStateValue = React.useMemo<TGlobalUiContextMemo>(
    () => ({
      ...globalUiState,
      toggleGobalNavigation,
    }),
    [globalUiState]
  );

  return React.createElement(Provider, { value: globalUiStateValue, ...props });
};

export const useGlobalUiContext = (): TGlobalUiContextMemo => React.useContext(GlobalUiContext);

export const navigationOpenState = () => useGlobalUiContext().isNavigationOpen;
