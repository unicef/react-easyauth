import React from 'react'
import EasyAuthContext from './EasyAuthContext'

/**
  * It performs actual token access and refresh mechanism
  * getToken receives the tokem from .auth/me 
  * refreshToken which handle the token expiry
  * App can also call refreshToken from its page in order to refresh the token
  * By default apiFetch and graphApiFetch handle the token refresh
  */
const EasyAuthProvider = ({authContext, children}) => {
  return (
    <React.Fragment>
      <EasyAuthContext.Provider
        value={authContext}
      >
        {children}
      </EasyAuthContext.Provider>
    </React.Fragment>
  )
}

export default EasyAuthProvider 