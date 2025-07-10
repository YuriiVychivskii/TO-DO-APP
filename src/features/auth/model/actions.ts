import { auth, db } from '@/shared/lib/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

type RegisterProps = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type LoginProps = {
	email: string;
	password: string;
};

export async function registerUser({
	name,
	email,
	password,
	confirmPassword,
}: RegisterProps) {
	if (!name || !email || !password || !confirmPassword) {
		throw new Error('All credentials are required');
	}

	if (password !== confirmPassword) {
		throw new Error('Passwords do not match');
	}

	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const uid = userCredential.user.uid;

		await updateProfile(userCredential.user, { displayName: name });

		await setDoc(doc(db, 'users', uid), {
			uid,
			name,
			email,
			roles: {},
		});

		return userCredential.user;
	} catch (error) {
		throw error;
	}
}

export async function loginUser({ email, password }: LoginProps) {
	if (!email || !password) {
		throw new Error('Email and password are required!');
	}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}

export async function logoutUser() {
	try {
		await signOut(auth);
	} catch (error) {
		throw error;
	}
}
