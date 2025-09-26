'use server';
import { db } from '@/lib/firebase';
import type { User, UserStatus } from '@/lib/types';
import { collection, doc, getDoc, setDoc, getDocs, where, query, updateDoc } from 'firebase/firestore';

const usersCollectionRef = collection(db, 'users');

export const getUserByUsername = async (username: string): Promise<User | null> => {
    const userDocRef = doc(db, 'users', username);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        return null;
    }

    return { id: userDoc.id, ...userDoc.data() } as User;
}

export const addUser = async (user: Omit<User, 'id'>): Promise<string> => {
    if (!user.username) {
        throw new Error("Username is required to add a user.");
    }
    const userDocRef = doc(db, 'users', user.username);
    await setDoc(userDocRef, user);
    return user.username;
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const q = query(usersCollectionRef, where('status', '==', 'active'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    } catch (error) {
        console.error("Error fetching users: ", error);
        return [];
    }
}

export const updateUser = async (id: string, data: Partial<User>): Promise<void> => {
    const userDocRef = doc(db, 'users', id);
    await updateDoc(userDocRef, data);
}
