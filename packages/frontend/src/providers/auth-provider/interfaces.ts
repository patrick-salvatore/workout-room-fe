export interface IAuthDataContext {
  isAuthenticated: boolean;
  id: number | undefined;
}

export interface IAuthDataMemo extends IAuthDataContext {
  onLogout: (logoutAuthData: IAuthDataContext) => void;
  onLogin: (newAuthData: IAuthDataContext) => void;
}
