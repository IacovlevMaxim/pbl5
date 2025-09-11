import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { Alert } from 'react-native';

export const useLoginMutation = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loginData: { identifier: string; password: string }) => {
      const res = await auth?.authFetch('/api/Auth/login', {
        fetchParams: { 
          method: 'POST',
          body: JSON.stringify({ 
            identifier: loginData.identifier, 
            password: loginData.password 
          }) 
        } 
      });
      return res;
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        auth?.signIn();
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error) => {
      Alert.alert("Login failed", "Please check your credentials.");
    }
  });
};

export const useRegisterMutation = () => {
  const auth = useAuth();
  
  return useMutation({
    mutationFn: async (registerData: any) => {
      const res = await auth?.authFetch('/api/Auth/register', {
        fetchParams: { 
          method: 'POST',
          body: JSON.stringify(registerData) 
        } 
      });
      return res;
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        auth?.signIn();
      }
    },
    onError: (error) => {
      Alert.alert("Failed to register", "Please try again later.");
    }
  });
};

export const useForgotPasswordMutation = () => {
  const auth = useAuth();
  
  return useMutation({
    mutationFn: async (email: string) => {
      return await auth?.authFetch('/api/Auth/forgot-password', {
        fetchParams: { 
          method: 'POST',
          body: JSON.stringify({ email }) 
        } 
      });
    },
    onSuccess: (data) => {
      Alert.alert("Success", "Password reset link sent to your email.");
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to send reset link.");
    }
  });
};

export const useResetPasswordMutation = () => {
  const auth = useAuth();
  
  return useMutation({
    mutationFn: async (resetData: { token: string; password: string }) => {
      return await auth?.authFetch('/api/Auth/reset-password', {
        fetchParams: { 
          method: 'POST',
          body: JSON.stringify(resetData) 
        } 
      });
    },
    onSuccess: (data) => {
      Alert.alert("Success", "Password reset successfully.");
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to reset password.");
    }
  });
};

export const useConfirmEmailMutation = () => {
  const auth = useAuth();
  
  return useMutation({
    mutationFn: async (token: string) => {
      return await auth?.authFetch('/api/Auth/confirm-email', {
        fetchParams: { 
          method: 'POST',
          body: JSON.stringify({ token }) 
        } 
      });
    },
    onSuccess: (data) => {
      Alert.alert("Success", "Email confirmed successfully.");
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to confirm email.");
    }
  });
};