# Unicef react-easyauth [![npm](https://img.shields.io/npm/v/@unicef/react-easyauth.svg?style=flat-square)](https://www.npmjs.com/package/@unicef/react-easyauth)

React easy auth makes the authentication simpler

React easy auth is a [react](https://reactjs.org/) component. It provides single sign-on expereince to a react app using microsoft easy auth approach.

React easy auth wraps the functionality of single sign on authentication to the react app.

Main features:

- Enables microsoft single sign-on using easy auth approach .
- It can connect application api as well as graph/third party api.
- apiFetch helps to call application api.
- graphApiFetch helps to call graph/third party api

[View on Github](https://github.com/unicef/react-easyauth)

## Installation

```bash
npm install @unicef/react-easyauth --save
```

## Usage

```jsx static
// index.js
import { EasyAuthProvider } from "@unicef/react-easyauth"

ReactDOM.render(
  <EasyAuthProvider url="appurl" graphUrl="graphUrl">
    <App />
  </EasyAuthProvider>,
  document.getElementById("root")
)

// app.js or jsx

import React from "react"
import { EasyAuthContext, apiFetch, graphApiFetch } from "@unicef/react-easyauth"

export default function MyComponent() {
  //initlialize the context
  const authContext = React.useContext(EasyAuthContext)
  //call the graph api
  graphApiFetch(authContext, "/v1.0/users")
    .then(function(res) {
      if (res.ok) return res.json()
    })
    .then(json => {
      console.log(json.value.length)
      setCount(json.value.length)
    })
  //call the application api
  apiFetch(authContext, url)
    .then(function(res) {
      if (res.ok) return res.json()
    })
    .then(json => {
      console.log(json.value.length)
      setCount(json.value.length)
    })
  return <React.Fragment></React.Fragment>
}
```
