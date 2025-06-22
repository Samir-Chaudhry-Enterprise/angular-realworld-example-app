import { useAuthStore } from "../../core/auth/store/auth.store";

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };
}
