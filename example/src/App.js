import React, {useState, useContext} from 'react'
import { EasyAuthContext, useAuthFetch } from '@unicef/react-easyauth'

function App() {
  const [userName, setUserName] = useState('Loading...')
  const [token, setToken] = useState('Loading..')
  const [expiresOn, setExpiresOn] = useState('Loading...')
  const [count, setCount] = useState(0)
  const authContext = useContext(EasyAuthContext)
  const authFetch = useAuthFetch()

  React.useEffect(() => {
    console.log('authContext in APP &&& ', authContext)
    authContext.isInitialized().then( () => {  
        setUserName(authContext.userId)
        setToken(authContext.token)
        setExpiresOn(authContext.expiresOn.toString())
      })  
  },[authContext])

  const handleApiClick = () => {
    authFetch('https://merlos.azurewebsites.net/test.json') 
      .then(function (res) {
        if (res.ok)
          return res.json()
      })
      .then(result => {
        console.log(result)
      })
  }

  // In order this to work, graph API needs to be setup. See Readme
  //
  const handleGraphApiClick = () => {
    authFetch('https://graph.microsoft.com/v1.0/me')
      .then(function (res) {
        if (res.ok)
          return res.json()
      })
      .then(json => {
        console.log(json.value.length)
        setCount(json.value.length)
      })
  }
    return (
    <React.Fragment>
      <h1>Easy Auth example</h1>
      <dl>
        <dt>Logged in username</dt> 
        <dd>{userName}</dd>
        <dt>Token</dt> 
        <dd>{token}</dd>
        <dt>ExpiresOn</dt> 
        <dd>{expiresOn}</dd>
      </dl>
      <h2>Inspect console on click</h2>
      <button onClick={() => handleApiClick()}> API call</button>

      <button onClick={() => handleGraphApiClick()} >Graph API Call</button>
    </React.Fragment>
  )
}

export default App;
