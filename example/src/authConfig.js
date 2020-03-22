
import {AuthContext} from '@unicef/react-easyauth'

const config = {
  apiUrl: 'https://xxx.azurewebsites.net',  // <--- set your App Service URL
  graphUrl: 'https://graph.microsoft.com'
}

export const authContext = AuthContext(config.apiUrl)

// For API calls within the same App Service as the auth context
export const apiFetch = (path, options = {}) => {
  return authContext.authFetch(config.apiUrl + path, options)
}

// For Graph API calls 
export const graphFetch = (path, options = {}) => {
  return authContext.authFetch(config.graphUrl + path, options)
}