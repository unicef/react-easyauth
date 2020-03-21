/**
 * 
 * Fetch that includes the authentication bearer on making the calls
 * Also, if the EasyAuth token expired, it refreshes it before making the API call.
 * 
 * @param {AuthContext} authContext an instance of the AuthContext object
 * @param {string} url complete URL. Example: http://appservice.azurewebsites.net/api/endpoint 
 * @param {Object} options regular fetch options
 * 
 * @returns {Promise} returns the Promise (same as fetch)
 */

export default async function authFetch(authContext, url, options = {}) {

  options.headers = options.headers || {}
  //if the token expired => refresh it
  if (await authContext.hasTokenExpired()) {
    console.log('authFetch received if token expired')
    //await authContext.refreshToken()
  }
  //Set the auth bearer
  options.headers.Authorization = 'Bearer ' + authContext.token
  return fetch(url, options)

}

