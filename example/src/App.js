import React from 'react'
import { EasyAuthContext, graphApiFetch, apiFetch } from '@unicef/react-easyauth'

function App() {
  const [userName, setUserName] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [count, setCount] = React.useState(0)
  const authContext = React.useContext(EasyAuthContext)
  React.useEffect(() => {
    if (authContext && authContext.userData.name !== '') {
      setUserName(authContext.userData.name)
      setToken(authContext.userData.token)
    }
  })

  const clickHandle = () => {
    graphApiFetch(authContext, '/v1.0/users')
      .then(function (res) {
        if (res.ok)
          return res.json()
      })
      .then(json => {
        console.log(json.value.length)
        setCount(json.value.length)
      })
      
    // apiFetch(authContext, 'api/offices')
    //   .then(function (res) {
    //     if (res.ok)
    //       return res.json()
    //   })
    //   .then(result => {
    //     console.log(result)
    //   })
  }
    return (
    <React.Fragment>
      <h1>This is Test</h1>
      <span>Login User name : </span> <h1>{userName}</h1>
      <span>Token : </span> <h1>{token}</h1>
      <button onClick={clickHandle} >Click Me</button>
      <span>Total users : </span> <h1>{count}</h1>
    </React.Fragment>
  )
}

export default App;
