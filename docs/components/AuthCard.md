# AuthCard Component Documentation

## Purpose
The AuthCard component handles user authentication forms for both login and signup functionality.

## Features
- Toggle between login and signup forms
- Form validation
- Styled input fields with icons
- Responsive design
- Pixel art styling

## Props
```typescript
interface AuthCardProps {
  activePanel: 'none' | 'login' | 'signup';
  formData: UserData;
  onFormChange: (data: Partial<UserData>) => void;
  onLogin: (e: React.FormEvent) => void;
  onSignup: (e: React.FormEvent) => void;
}
```

## Usage Example
```jsx
<AuthCard
  activePanel="login"
  formData={formData}
  onFormChange={handleFormChange}
  onLogin={handleLogin}
  onSignup={handleSignup}
/>
```

## Use Cases
1. New user registration
2. Existing user login
3. Form data validation
4. User feedback