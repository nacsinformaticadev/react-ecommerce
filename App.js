import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, Button } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import AppNavigation from './src/navigation/AppNavigation'
import AuthSreen from "./src/screens/AuthScreen"
import AuthContext from './src/context/AuthContext';
import { setTokenApi, getTokenApi, removeTokenApi } from './src/api/token'

export default function App() {

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();

      if (token) {

        setAuth({
          token,
          idUser: jwtDecode(token).id
        })
      } else {
        setAuth(null);
      }

    })()
  }, [])

  const login = (user) => {
    setTokenApi(user.jwt)
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    })
  }

  const logout = () => {

    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#8e453b',
      accent: '#728636',
    },
  };
  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider theme={theme}>
        {auth ? <AppNavigation /> : <AuthSreen />}
      </PaperProvider>
    </AuthContext.Provider>

  );
}


