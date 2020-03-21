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
  }

  /**
   * Pauses for ms milliseconds
   * @param {Integer} ms 
   */
  const delay = (ms = 100) => new Promise(_ => setTimeout(_, ms));

  /**
   * Returns true if the token of the context has expired 
   */
  context.hasTokenExpired = async () => {
    // TODO: find a more 
    // It pools 
    while (context.isLoadingToken) {
      console.log("hasTokenExpired: delay context.isLoadingToken")
      await delay(100)
    }
    if (context.expiresOn === null) return false
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
    await delay(5000)
    console.log('getToken: finished delay')
    const res = await fetch(context.url + '/.auth/me')
    console.log('getToken res:', res)
    if (! res.ok) {
      context.isLoadingToken = false
      throw Error(res.error)
    }
    if (res.redirected) {
      if (refreshOnRedirect) { 
        await context.refreshToken()
        return
      } else { 
       // console.log('getToken redirected true res:', res)
        //context.isLoadingToken = false
        // TODO create an iframe to handle auth.
        //throw Error(`EasyAuthRedirectError: /.auth/me is redirecting the request. During development this may be because you are not already authenticated. Try signing in in ${context.url} in another tab.`)
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
      context.isLoadingToken = false
      console.log('AuthContext.refresh error: ', error)
    }
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