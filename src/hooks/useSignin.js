import React from 'react'
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import { jwtDecode } from 'jwt-decode';
const useSignin = () => {
    const [user, setUser] = useAtom(userAtom);

  const handleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);

      setUser({
        uid: decoded.sub,
        displayName: decoded.name,
        email: decoded.email,
      });
    }
  };

  const handleError = () => {
    console.log("Google Sign In failed ");
  };
  return {handleSuccess, handleError}
}

export default useSignin
