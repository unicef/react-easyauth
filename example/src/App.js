import React, {useState, useContext} from 'react'
import { EasyAuthContext, useAuthFetch } from '@unicef/react-easyauth'

function App() {

  const [userName, setUserName] = useState('Loading...')
  const [token, setToken] = useState('Loading..')
  const [expiresOn, setExpiresOn] = useState('Loading...')
  const [error, setError] = useState(null)
  const authContext = useContext(EasyAuthContext)
  const authFetch = useAuthFetch()

  const [apiResponse, setApiResponse] = useState('--')
  const [graphResponse, setGraphResponse] = useState('--')
  

  React.useEffect(() => {
    console.log('authContext in APP &&& ', authContext)
    authContext.isInitialized().then( () => {  
        setUserName(authContext.userId)
        setToken(authContext.token)
        setExpiresOn(authContext.expiresOn.toString())
      }).catch(error => {
        setError(error)
      })
  },[authContext])

  const handleApiClick = () => {
    authFetch('https://xxx.azurewebsites.net/test.json') 
      .then(function (res) {
        if (res.ok)
          return res.json()
      })
      .then(result => {
        setApiResponse(JSON.stringify(result))
      }).catch(error => {
        setApiResponse(error.message)
      })
  }

  // In order this to work, graph API needs to be setup. See Readme
  //
  const handleGraphClick = () => {
    authFetch('https://graph.microsoft.com/v1.0/me')
      .then(function (res) {
        console.log(res)
        if (res.ok) { 
          return res.json()
        }
        throw Error(res.statusText)
      })
      .then(data => {
        console.log(data)
        setGraphResponse(JSON.stringify(data))
      })
      .catch(error => setGraphResponse(error.message))
  }
    return (
    <React.Fragment>
      <h1>Easy Auth Context </h1>
      { error ? 
      <pre>{error.message}</pre>
      : ( 
      <dl>
        <dt>Logged in username</dt> 
        <dd>{userName}</dd>
        <dt>Token</dt> 
        <dd>{token}</dd>
        <dt>ExpiresOn</dt> 
        <dd>{expiresOn}</dd>
      </dl>
      )}

      <h2>Fetch Calls</h2>
      <dl>
        <dt>API <button onClick={() => handleApiClick()}>Call API</button></dt>
        <dd><pre>{apiResponse}</pre></dd>
        <dt>Graph API <button onClick={() => handleGraphClick()} >Call Graph API (/me)</button> </dt>
        <dd><pre>{graphResponse}</pre></dd>
      </dl>

    </React.Fragment>
  )
}

export default App;
