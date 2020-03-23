import { useContext } from 'react';
import EasyAuthContext from '../components/EasyAuthContext';

/**
 * Returns the AuthContext object 
 */
function useAuthContext() {
  return useContext(EasyAuthContext)
}

export default useAuthContext