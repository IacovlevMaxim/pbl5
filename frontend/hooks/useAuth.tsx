import { useRouter, useSegments } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

// Define Auth context types
type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  authFetch: (endpoint:string, params: Fetch) => Promise<any>,
  refreshAccessToken: () => Promise<void>,
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
  const queryClient = useQueryClient();

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
    console.log("endpoint", endpoint)
    if(endpoint === "/api/Auth/register") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          message: "User registered successfully. Please check your email to confirm your account."
        });
      });
    }

    if(endpoint === "/api/Auth/reset-password") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          message: "Password reset successfully."
        });
      });
    }

    if(endpoint === "/api/Auth/forgot-password") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          message: "Password reset link sent to your email."
        });
      });
    }

    if(endpoint === "/api/Auth/confirm-email") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          message: "Email confirmed successfully."
        });
      });
    }

    if(endpoint === "/api/Auth/refresh") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMTgwOTM2OC0yOGViLTRjOGQtOGJlOC02YWU2MGY4NjJmMDciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAxOTkyZDgzLWFkOWItNzljMC04MDg5LWIyYWMxN2M0NWRhZCIsImV4cCI6MTc1NzQwOTk1MSwiaXNzIjoiTWVkSHViIiwiYXVkIjoiTWVkSHViIn0.t2yreZdb4CNL61ZC11s1YHQxKjM5tlM3FaxhS6hS1a4",
          "accessTokenExpiresAt": "2025-09-09T09:25:51.487209Z"
        })
      });
    }


    if(endpoint === "/api/Auth/login") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NzMxMTg1OS0zZTRmLTQ5MzItYmU1ZS04MWNlZTM5NjJhOTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAxOTkyZDgzLWFkOWItNzljMC04MDg5LWIyYWMxN2M0NWRhZCIsImV4cCI6MTc1NzQwOTc2NywiaXNzIjoiTWVkSHViIiwiYXVkIjoiTWVkSHViIn0.oGKnVpTSaSyz4fk3wnNmznwfXlWB7mri60s2jw19pdU",
          "accessTokenExpiresAt": "2025-09-09T09:22:47.4861357Z",
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MzQ0MDEzZi1jYjA1LTQ1YzctOTJhYS04YWU4N2MyOGY0NWUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImVuY191c2VyX2lkIjoiaVplZTJQK1ZLN2ZhV2VMS1JUZlBCMDZHcFlpQWx5VFNCUE0zRFdNbldacWQ4QVpaZW1GMWRXSENkdTg4WU5kVVk0cCtLSHh3d0FFdkc3LzVyRStreHc9PSIsImV4cCI6MTc1NzQ5MjU2NywiaXNzIjoiTWVkSHViIiwiYXVkIjoiTWVkSHViIn0.sMXLyPg6AolEoQzKwl5h-3LDSRB7E4ELYeHVlbmbo_U",
          "refreshTokenExpiresAt": "2025-09-10T08:22:47.4861363Z"
        });
      });
    }

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

  const refreshAccessToken = async() => {
    const res = await authFetch('/api/Auth/refresh', {
      fetchParams: { 
        method: 'POST',
        body: JSON.stringify({ 
          //Take refresh token from storage/cookie
          refreshToken: null
        }) 
      } 
    })//then(response => response.json())
    
    //Save res.accessToken to storage/cookie
    //Set expiration date to res.accessTokenExpiresAt

    queryClient.invalidateQueries({ queryKey: ['auth'] });
    // return res;
  }

  return (
    <AuthContext.Provider 
      value={{ 
        signIn: () => setAuthenticated(true),
        signOut: () => {
          setAuthenticated(false)
          queryClient.clear();
        },
        authenticated: !!authenticated,
        refreshAccessToken,
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
