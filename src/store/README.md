# Farmer Store - Zustand State Management

This directory contains the Zustand store for managing farmer authentication and user information.

## Store: `useFarmerStore.ts`

### Features
- **Persistent Storage**: Automatically saves farmer data to localStorage
- **Authentication State**: Tracks login status and JWT token
- **Type-Safe**: Full TypeScript support with proper interfaces

### State Structure

```typescript
{
  farmer: FarmerInfo | null,
  isAuthenticated: boolean,
  token: string | null
}
```

### Farmer Info Interface

```typescript
interface FarmerInfo {
  id?: string;
  username: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  languagePreference?: string;
  hasDisability?: boolean;
  disabilityType?: string;
  answerPreference?: 'voice' | 'chat' | 'both';
  createdAt?: string;
  lastLoginAt?: string;
}
```

### Available Actions

- `login(farmer, token)` - Save farmer data and token, set authenticated to true
- `logout()` - Clear all data and set authenticated to false
- `setFarmer(farmer)` - Update farmer data
- `setToken(token)` - Update authentication token
- `updateFarmer(updates)` - Partially update farmer information

## Usage Examples

### In a Component

```tsx
import { useFarmerStore } from '@/store/useFarmerStore';

function MyComponent() {
  const { farmer, isAuthenticated, login, logout } = useFarmerStore();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {farmer?.username}!</h1>
      <p>Email: {farmer?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protect Routes

```tsx
import { Navigate } from 'react-router-dom';
import { useFarmerStore } from '@/store/useFarmerStore';

function ProtectedRoute({ children }) {
  const isAuthenticated = useFarmerStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
}
```

### Access Token for API Calls

```tsx
import axios from 'axios';
import { useFarmerStore } from '@/store/useFarmerStore';

async function fetchUserData() {
  const token = useFarmerStore.getState().token;
  
  const response = await axios.get('/api/user-data', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
}
```

### Update User Preferences

```tsx
function SettingsPage() {
  const { farmer, updateFarmer } = useFarmerStore();

  const handleLanguageChange = (language: string) => {
    updateFarmer({ languagePreference: language });
  };

  return (
    <div>
      <h2>Settings</h2>
      <select 
        value={farmer?.languagePreference} 
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  );
}
```

## Integration Notes

### SignIn Page
The `SignIn.tsx` page has been updated to automatically save farmer data to the store upon successful login. The data persists across browser sessions via localStorage.

### Data Persistence
- Storage key: `farmer-storage`
- Storage type: localStorage
- Automatic hydration on app reload

## Security Considerations

⚠️ **Important**: 
- The authentication token is stored in localStorage (not the most secure option)
- For production, consider:
  - Using httpOnly cookies for tokens
  - Implementing token refresh mechanisms
  - Adding token expiration checks
  - Encrypting sensitive data before storing
