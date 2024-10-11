import { UserProfile } from "./userProfile";

export interface AuthState {
    isAuthorized: boolean;
    user: UserProfile | null; 
    pending: {
      signIn: boolean;
      signUp: boolean;
      signOut: boolean;
      getUserProfile:boolean;
    };
    errors: {
      signIn: string | null; 
      signUp: string | null;
      signOut: string | null;
      getUserProfile:boolean|null;
    };
  }