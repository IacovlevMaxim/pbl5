import { useRouter, useSegments } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import React from 'react';

// Define Auth context types
type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  authFetch: (endpoint:string, params: Fetch) => Promise<any>
  authenticated: boolean;
} | null;

interface FetchParams {
  [key: string]: string;
}

interface Fetch {
  fetchParams: FetchParams;
  auth?: boolean;
}

// Create an authentication context
const AuthContext = createContext<AuthContextType>(null);

// Authentication provider component
function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  // Check if user is authenticated whenever the segments change
  useEffect(() => {
    console.log("AuthProvider - segments:", segments, "authenticated:", authenticated);
    const inAuthGroup = segments[0] === '(tabs)';

    if(authenticated === null) {
        setAuthenticated(false);
        return;
    }
    
    if (!authenticated && inAuthGroup) {
      // Redirect to the login page if trying to access protected routes
      router.replace('/login');
    } else if (authenticated && ['login', 'register', 'reset', 'new-password'].includes(segments[0])) {
      // Redirect to the tabs if already authenticated
      router.replace('/(tabs)');
    }
  }, [authenticated, segments]);

  const authFetch = (endpoint:string, params: Fetch) => {
    const { fetchParams, auth = true } = params;
    return fetch(endpoint, {
      method: fetchParams.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { 'Authorization': `Bearer ${null}` } : {}),
      },
      body: JSON.stringify(fetchParams.body || {}),
    });
  }

  return (
    <AuthContext.Provider 
      value={{ 
        signIn: () => setAuthenticated(true),
        signOut: () => setAuthenticated(false),
        authenticated: !!authenticated,
        authFetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use authentication context
function useAuth() {
  return useContext(AuthContext);
}


export { AuthProvider, useAuth };
