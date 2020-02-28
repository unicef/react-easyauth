# Unicef react-easyauth [![npm](https://img.shields.io/npm/v/@unicef/react-easyauth.svg?style=flat-square)](https://www.npmjs.com/package/@unicef/react-easyauth)

React easy auth is a [react](https://reactjs.org/) component. It provides single sign-on experience to a react app using microsoft easy auth approach. It wraps the easy auth context into the react app.

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
## Development Restrictions

In order to debug in local, needs to make the following changes in the browser(chrome)

* create new instance of chrome
* right click on that instance choose properties
* replace this command in Target field '"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp'
* launch the localhost in the instance
* new tab of that browser launch the actual app url. it will create appauth session
* localhost can access that auth session using .auth/me

## Server changes

In order to access the third party api, needs to make the following changes in azure

* Azure AD Services -> App Registrations
* Locate the app -> Api Permissions options add MS Graph User.Read.All give the admin consent -> it depneds on the application. if app requires to access we have to perform this.

Resources.azure.com

* click subscriptions -> subcription name -> resourceGroups -> resourceGroupName -> providers -> Microsoft.Web -> sites -> Appname -> config -> authsettings -> Edit
* Update FROM "additionalLoginParams": null, TO "additionalLoginParams": [ "response_type=code id_token", "resource=https://graph.microsoft.com" ],
* Click Put to save the settings