import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const registerUserAPI = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  // auth.js에서 Firestore 저장 디버깅
  // try {
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
  });
  //   console.log('Firestore 데이터 저장 성공');
  // } catch (error) {
  //   console.error('Firestore 데이터 저장 실패:', error); // 실패한 경우 에러 출력
  // }
  return {
    uid: user.uid,
    email: user.email,
    name,
  };
};
