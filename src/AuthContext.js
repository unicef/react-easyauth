
const AuthContext = (url) => {
  const context = {
    isLoadingToken: false,
    url: url,
    userId: '',
    token: '', //EasyAuth token
    expiresOn: null, // Datetime when the token expires
    response: {}, //Token response
    isError: false, //Set to true if there is any error in the context
    error: null // Set if there is an Error() thrown 
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
      console.log("delay context.isLoadingToken")
      await delay(100)
    }
    let currentDate = new Date()
    console.log(`expiresOn ${context.expiresOn.toString()} now: ${currentDate.toString()}` )
    return (currentDate.getTime() >= context.expiresOn.getTime()) ? true : false
  }

  /**
   * Gets the token. 
   */
  context.getToken = async () => {
    context.isLoadingToken = true
    await delay(10000)
    const res = await fetch(context.url + '/.auth/me')
    console.log(res)
    if (! res.ok) {
      context.isLoadingToken = false
      throw Error(res.error)
    }
    if (res.redirected) {
      console.log(res)
      context.isLoadingToken = false
      throw Error('/.auth/me is redirecting the request. This typically happens in localhost be either because CORS is not enabled in the AppService or because you are not authenticated/the session has expired.')
    }
    console.log('res ok')
    const data = await res.json()
    console.log('easy auth data', data)
    context.userId = data[0].user_id
    context.token = data[0].access_token
    context.expiresOn = new Date(data[0].expires_on)
    context.isLoadingToken = false

  }

  /**
   * Refreshes the token information
   * first calls /.auth/refresh and then calls AuthContext.getToken
   */
  context.refreshToken = async () => {
    try { 
      context.isLoadingToken = true
      const res = await fetch(url + '/.auth/refresh')
      console.log('refresh response', res)
      if (res.ok) {
        console.log('refresh ok, getting token')
        await context.getToken()
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
   */
  context.logout = () => {
    window.location = url + '/.auth/logout'
  }   
  context.getToken()
  return context

}

export default AuthContext