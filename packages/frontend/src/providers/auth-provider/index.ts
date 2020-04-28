import React, {
  createContext,
  useState,
  // useEffect,
  useMemo,
  useContext,
} from 'react';
import { IAuthDataContext, IAuthDataMemo } from './interfaces';
/**
 * TODO AUTH MIDDLEWARE
 */
// import someManager from "../some-manager";

const initialAuthData = { isAuthenticated: true, id: 0 };

export const AuthDataContext = createContext<IAuthDataContext>(initialAuthData);

const AuthDataProvider = (props): any => {
  const [authData, setAuthData] = useState<IAuthDataContext>(initialAuthData);
  const { Provider } = AuthDataContext;

  /*
   * TODO: Add cookie/token check to
   * set auth data on first render
   */

  // useEffect(() => {
  //   const currentAuthData = someManager.getAuthData();
  //   if (currentAuthData) {
  //     setAuthData(currentAuthData);
  //   }
  // }, []);

  const onLogout = (logoutAuthData: IAuthDataContext) => {
    if (!logoutAuthData) {
      logoutAuthData = initialAuthData;
    }

    setAuthData(logoutAuthData);
  };

  const onLogin = (newAuthData: IAuthDataContext) => setAuthData(newAuthData);

  const memoObject = {
    ...authData,
    onLogout,
    onLogin,
  };
  const authDataValue = useMemo<IAuthDataMemo>(() => memoObject, [authData]);

  return React.createElement(Provider, { value: authDataValue, ...props });
};

export const useAuthDataContext = (): IAuthDataContext =>
  useContext(AuthDataContext);

export default AuthDataProvider;