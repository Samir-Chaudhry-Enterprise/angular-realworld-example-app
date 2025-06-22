import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { useAuthStore } from './core/auth/store/auth.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<div>Home Page - Coming Soon</div>} />
            <Route path="/login" element={<div>Login Page - Coming Soon</div>} />
            <Route path="/register" element={<div>Register Page - Coming Soon</div>} />
            <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
            <Route path="/editor" element={<div>Editor Page - Coming Soon</div>} />
            <Route path="/editor/:slug" element={<div>Edit Article Page - Coming Soon</div>} />
            <Route path="/article/:slug" element={<div>Article Page - Coming Soon</div>} />
            <Route path="/profile/:username" element={<div>Profile Page - Coming Soon</div>} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
