import { useContext } from 'react';
import EasyAuthContext from '../components/EasyAuthContext';

function useAuthFetch() {
  const authContext = useContext(EasyAuthContext)
  return (url, options = {}) => authContext.authFetch(url, options)
}

export default useAuthFetch