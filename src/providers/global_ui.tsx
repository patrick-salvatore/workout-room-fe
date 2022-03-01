import { createSignal, createContext, useContext, Accessor } from 'solid-js';

const globalUiState = {
  isNavigationOpen: false,
};

const [state, setGlobalUiState] = createSignal(globalUiState);
const store = [
  state,
  {
    toggleGobalNavigation() {
      setGlobalUiState(v => ({ ...v, isNavigationOpen: !v.isNavigationOpen }));
    },
  },
];

const GlobalUiContext = createContext(store);
export function GlobalUiProvider(props) {
  return <GlobalUiContext.Provider value={store}>{props.children}</GlobalUiContext.Provider>;
}

export function useGlobalUiContext() {
  return useContext(GlobalUiContext) as [
    Accessor<typeof globalUiState>,
    { toggleGobalNavigation: VoidFunction }
  ];
}
