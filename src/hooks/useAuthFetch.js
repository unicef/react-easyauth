import { useContext } from 'react';
import EasyAuthContext from '../components/EasyAuthContext';

function useAuthFetch() {
  const authContext = useContext(EasyAuthContext)
  return (url, options = {}) => authFetch(authContext, url, options)
}

export default useAuthFetch