import { Navigate } from 'react-router-dom';
import { useFarmerStore } from '@/store/useFarmerStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication. If the user is not authenticated,
 * they will be redirected to the sign-in page.
 * 
 * Usage:
 * ```tsx
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 * } />
 * ```
 */
export function ProtectedRoute({ children, redirectTo = '/signin' }: ProtectedRouteProps) {
    const isAuthenticated = useFarmerStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
}
