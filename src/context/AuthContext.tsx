import React, { useState, createContext, ReactNode, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';

import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: User;
  sigInWithGoogle: () => void;
  sigInWithApple: () => void;
  signOut: () => void;
};

type AuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const userStorageKey = '@GoFinances:user';

  useEffect(() => {
    async function loadStoredData() {
      const userData = await AsyncStorage.getItem(userStorageKey);
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setIsLoading(false);
    }
    loadStoredData();
  }, []);

  async function sigInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        });
        console.log(user);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function sigInWithApple() {
    try {
      const crendential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (crendential) {
        const userLogged = {
          id: String(crendential.user),
          name: crendential.fullName!.givenName!,
          email: crendential.email!,
          photo: undefined,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(userStorageKey);
  }

  return (
    <AuthContext.Provider
      value={{ user, sigInWithGoogle, sigInWithApple, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
