
import {AuthContext} from '@unicef/react-easyauth'

const config = {
  apiUrl: 'https://merlos.azurewebsites.net',  
  //apiUrl: 'https://xxx.azurewebsites.net',
  graphUrl: 'https://graph.microsoft.com'
}


export const authContext = AuthContext(config.apiUrl)
console.log('authContext config', authContext)

export const apiFetch = (path, options = {}) => {
  console.log("index.apiFetchPath: " + path)
  return authContext.authFetch(config.apiUrl + path, options)
}

export const graphFetch = (path, options = {}) => {
  console.log("index.graphFetchPath: " + path)
  return authContext.authFetch(config.graphUrl + path, options)
}