export type TGlobalUiContext = {
  isNavigationOpen: boolean;
};

export type TGlobalUiContextMemo = {
  toggleGobalNavigation?: () => void;
} & TGlobalUiContext;
