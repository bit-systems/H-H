import { db } from "@/db/config";
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { User } from "./user.model";
import { CustomError } from "@/helpers/error/customError";
import { getOtp, setOtpExpiry } from "./helpers";

const userRef = collection(db, "User") as CollectionReference<User>;

const isUserExistsWithEmail = async (email: string): Promise<boolean> => {
  const q = query(userRef, where("email", "==", email));
  const snapshots = await getDocs(q);
  return !snapshots.empty;
};

const isUserExistsWithMobile = async (
  mobileNumber: string
): Promise<boolean> => {
  const q = query(userRef, where("mobileNumber", "==", mobileNumber));
  const snapshots = await getDocs(q);
  return !snapshots.empty;
};

const isUserExistsWithUniqueFields = async (
  email: string,
  mobileNumber: string
): Promise<boolean> => {
  const emailExists = await isUserExistsWithEmail(email);
  if (emailExists) {
    throw new CustomError("User with same email already exists.");
  }

  const mobileExists = await isUserExistsWithMobile(mobileNumber);
  if (mobileExists) {
    throw new CustomError("User with same mobile number already exists.");
  }
  return false;
};

const isUpdateUserExistsWithUniqueFields = async (
  id: string,
  email: string | null,
  mobileNumber: string | null
): Promise<void> => {
  if (email) {
    const q = query(
      userRef,
      where("email", "==", email),
      where("id", "!=", id)
    );
    const snapshots = await getDocs(q);

    if (!snapshots.empty) {
      throw new CustomError("User with same email already exists.");
    }
  }

  if (mobileNumber) {
    const q = query(
      userRef,
      where("mobileNumber", "==", mobileNumber),
      where("id", "!=", id)
    );
    const snapshots = await getDocs(q);

    if (!snapshots.empty) {
      throw new CustomError("User with same email already exists.");
    }
  }
};

export const createUser = async (user: User, uniqueCheck = true) => {
  const newProductRef: DocumentReference<User> = doc(userRef);

  const userWithId = { ...user, id: newProductRef.id };
  console.log(userWithId, "userWithId");
  if (uniqueCheck) {
    await isUserExistsWithUniqueFields(user.email, user.mobileNumber);
  }

  await setDoc(newProductRef, userWithId);
  return userWithId;
};

export const updateUser = async (user: User, uniqueCheck = true) => {
  if (!user.id) {
    await createUser(user);
    return;
  }

  const existingUser = await getUser(user.id);
  if (!existingUser) {
    throw new CustomError("User not found.");
  }

  if (uniqueCheck && existingUser) {
    if (existingUser.email !== user.email) {
      isUpdateUserExistsWithUniqueFields(user.id, user.email, null);
    }

    if (existingUser.mobileNumber !== user.mobileNumber) {
      isUpdateUserExistsWithUniqueFields(user.id, user.mobileNumber, null);
    }
  }

  const userDoc = doc(userRef, user.id);
  const { id, ...userWithoutId } = user;
  await updateDoc(userDoc, userWithoutId);
  return user;
};

export const getUser = async (id: string): Promise<User | null> => {
  console.log(id, "id in repo");
  const snapshot = await getDoc(doc(userRef, id));

  return snapshot.exists() ? snapshot.data() : null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const q = query(userRef, where("email", "==", email));
  const snapshots = await getDocs(q);
  const snapshot = snapshots.docs[0];
  return snapshot.exists() ? snapshot.data() : null;
};

export const getUserByMobileNumber = async (
  mobileNumber: string
): Promise<User | null> => {
  const q = query(userRef, where("mobileNumber", "==", mobileNumber));
  const snapshots = await getDocs(q);
  const snapshot = snapshots.docs[0];
  console.log(snapshots, "snapshot in repo");
  return snapshot?.exists() ? snapshot.data() : null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const snapshot = await getDoc(doc(userRef, id));
  return snapshot.exists() ? snapshot.data() : null;
};

export const sendOtpToUser = async (user: User, otp: string): Promise<void> => {
  const userDoc = doc(userRef, user.id);
  await updateDoc(userDoc, { otp, otpExpiry: setOtpExpiry() });
};

export const verifyOtpForUser = async (
  mobileNumber: string,
  otp: string
): Promise<Partial<User>> => {
  const user = await getUserByMobileNumber(mobileNumber);

  if (!user) {
    throw new CustomError("User not found");
  }

  if (user.otp !== otp) {
    throw new CustomError("Invalid OTP");
  }

  if (user.otpExpiry < Date.now()) {
    throw new CustomError("OTP expired");
  }

  const userDoc = doc(userRef, user.id);
  await updateDoc(userDoc, {
    otp: null,
    otpExpiry: null,
    isMobileVerified: true,
  });
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    mobileNumber: user.mobileNumber,
    email: user.email,
  };
};

export const createOrUpdateUser = async (user: User) => {
  const existingUser = await getUserByMobileNumber(user.mobileNumber);
  console.log(existingUser, "existingUser in repo");
  if (existingUser) {
    return await updateUser(
      { ...existingUser, ...user, id: existingUser.id },
      false
    );
  } else {
    return await createUser(user, false);
  }
};
