export default function apiFetch(authContext, url, options) {
    let apiUrl = authContext.userData.url + '/api/' + url
    let expireDate = new Date(authContext.userData.expiresOn)
    let currentDate = new Date()
  
    if (options === null || options === undefined) {
      options = {}
      if (options.headers == null || options.headers === undefined) {
        options.headers = {}
      }
    }
  
    if (expireDate.getDate() !== currentDate.getDate() || currentDate.getTime() >= expireDate.getTime()) {
      authContext.refreshToken()
    }
  
    options.headers.Authorization = 'Bearer ' + authContext.userData.token
    return fetch(apiUrl, options)
  }

  