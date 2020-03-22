// Microsoft documentation
/// https://docs.microsoft.com/en-us/azure/app-service/app-service-authentication-how-to

const AuthContext = (url) => {

  const context = {
    provider: 'aad',
    isLoadingToken: false,
    url: url,
    userId: '',
    token: '', //EasyAuth token
    expiresOn: null, // Datetime when the token expires
    response: {}, //Token response
    error: null
  }

  /**
   * Pauses for ms milliseconds
   * @param {Integer} ms 
   */
  const wait = (ms = 50) => new Promise(_ => setTimeout(_, ms));
  
  context.isInitialized = async () => {
    console.log('isInitialized context:', context)
    while (context.isLoadingToken && context.error === null) {
      console.log("isInitialized delay context.isLoadingToken")
      await wait()
    }
    if (context.error !== null) {
      console.log('isInitaalized Throwing error ')
      throw context.error
    }
  }

  /**
   * Returns true if the token of the context has expired 
   */
  context.hasTokenExpired = async () => {
    // TODO: find a more 
    // It pools 
    await context.isInitialized() 

    if (context.expiresOn === null) return true
    let currentDate = new Date()
    console.log(`expiresOn ${context.expiresOn.toString()} \nnow: ${currentDate.toString()}` )
    return (currentDate.getTime() >= context.expiresOn.getTime()) ? true : false
  }

  /**
   * Gets the token. 
   */
  context.getToken = async (refreshOnRedirect = true) => {
    console.log('getToken')
    context.isLoadingToken = true
    //console.log('getToken: finished delay')
    try { 
      const res = await fetch(context.url + '/.auth/me')
      console.log('getToken res:', res)
      if (! res.ok) {
        context.error = Error(res.error)
        context.isLoadingToken = false
        throw context.error
      }
      if (res.redirected) {
        res.redirect(res.url)
        if (refreshOnRedirect) { 
          await context.refreshToken()
          return
        } else { 
          context.error = Error(`EasyAuthRedirectError: /.auth/me is redirecting the request. During development this may be because you are not already authenticated. Try signing in in ${context.url} in another tab.`)
          throw context.error
        }
      } 
      context.isLoadingToken = false
      console.log('getToken, res ok')
      const data = await res.json()
      console.log('getToken data:', data)
      context.userId = data[0].user_id
      context.token = data[0].access_token
      context.expiresOn = new Date(data[0].expires_on)
      context.response = data[0]
    } catch (error) {
      //Typically if this fetch fails is because you have not configured CORS
      context.error = Error ('Fetch /.auth/me failed. \n(1) Check context.url is correct.\n(2) Check you have configured the CORS in both the App Service and in the browser.')
      context.isLoadingToken = false
      return
    }
  }

  /**
   * Refreshes the token information
   * first calls /.auth/refresh and then calls AuthContext.getToken
   */
  context.refreshToken = async () => {
    console.log('refreshToken')
    try { 
      context.isLoadingToken = true
      const res = await fetch(context.url + '/.auth/refresh')
      console.log('refresh response', res)
      if (res.ok) {
        console.log('refresh ok, getting token')
        await context.getToken(false)
      }
      if (res.status == 401) { 
        console.log('unauthorized => login and redirect to current location')
        window.location = context.url + '/.auth/login/' + context.provider + '?post_login_redirect_url=' + window.location
       
      }
    } catch(error) {
      context.error = error
      context.isLoadingToken = false
      console.log('AuthContext.refresh error: ', error)
    }
  }

  context.authFetch = async (url, options = {}) => { 
    options.headers = options.headers || {}
    //if the token expired => refresh it
    if (await context.hasTokenExpired()) {
      console.log('authFetch received if token expired')
      await context.refreshToken()
   }
    //Set the auth bearer
    options.headers.Authorization = 'Bearer ' + context.token
    return fetch(url, options)
  }

  /**
   * Logs out
   * 
   * Sets the URL context.url + /.auth/logout
   * 
   * TODO add post logout redirect uri /.auth/logout?post_logout_redirect_uri=/index.html
   */
  context.logout = () => {
    window.location = url + '/.auth/logout'
  }   

  //Get the token upon creating the context.
  context.getToken()
  return context

}

export default AuthContext