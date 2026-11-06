import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const ADMIN_EMAILS = ['alfredorecio267@gmail.com', 'milena.recio@gmail.com'];

export interface UserProfile {
  uid: string;
  email: string;
  role: 'client' | 'admin';
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const isOwnerAdmin = user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
        // Fetch user profile from Firestore
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            if (isOwnerAdmin && data.role !== 'admin') {
              // Upgrade to admin in firestore
              await setDoc(docRef, { ...data, role: 'admin' }, { merge: true });
              setUserProfile({ ...data, role: 'admin' });
            } else {
              setUserProfile(data);
            }
          } else {
            // Document doesn't exist yet, create it
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              role: isOwnerAdmin ? 'admin' : 'client',
            };
            await setDoc(docRef, {
              ...newProfile,
              createdAt: new Date(),
            });
            setUserProfile(newProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          if (isOwnerAdmin) {
            setUserProfile({
              uid: user.uid,
              email: user.email || '',
              role: 'admin',
            });
          } else {
            setUserProfile(null);
          }
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

