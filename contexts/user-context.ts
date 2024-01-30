import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Define the context with a default value and TypeScript type
interface IUserContext {
  user: any; // Define a proper type for your user object
}

const UserContext = createContext<IUserContext>({ user: null });

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user);



  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  // Ensure the value is  an object with a property named 'user'
  return (
    UserContext.Provider
  );
}

export const useUser = () => useContext(UserContext);
