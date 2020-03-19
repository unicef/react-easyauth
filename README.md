# React EasyAuth [![npm](https://img.shields.io/npm/v/@unicef/react-easyauth.svg?style=flat-square)](https://www.npmjs.com/package/@unicef/react-easyauth)


React Easy Auth is a [react](https://reactjs.org/) component wrapper that provides single sign-on experience to a React application. 

Main features:
 * Enabale Microsoft single sign-on using easy auth .
 * `apiFetch` function handles getting and refreshing the token when required.
 * `graphApiFetch` helps to call graph/third party api

## Install

 ```bash
 npm install @unicef/react-easyauth --save
```

## Usage

```jsx
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

An example is available in the example folder

## Localhost restrictions

Although EasyAuth simplifies handling the auth token, it does not fully simplify the localhost development :( due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues.

A workaround is to tell your browser to skip CORS.

### Google Chrome Windows

1. Open a command Window and run chrome with the following arguments:
   ```bash
   "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp'
   ```
2. Open the react application on the new browser.

Note that creating a shortcut with that command in the target field may be pretty convenient.

### Google on OSX 

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

```

Optionally you can create an alias in your `~/bash_profile`:

```bash
echo Adding alias chromecors
alias chromecors='/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp'
```
After that whenever you open a terminal you will see Adding alias chromecors and you can run

```bash
chromecors
```

### Firefox
It is only required to install [CORS Everywhere plugin](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)


# Enable third party APIs / Graph API with Easy Auth
Initially, you can add third party APIs to your EasyAuth token so you don't need handle that yourself. However you need to do some changes in your App Service configuration:

In `https://portal.azure.com` 

1. In Azure AD Services / App Registrations, locate the application.
2. In API Permissions / options, add MS Graph `User.Read.All`.
3. Check the box Admin consent.

In `https://resources.azure.com`

1. On the left browser click on subscriptions -> Subcription name -> resourceGroups -> resourceGroupName -> providers -> Microsoft.Web -> sites -> <Appname> -> config -> authsettings -> Edit

2. Update property `additionalLoginParams`. Replace
   ```
   "additionalLoginParams": null,
   ```
   with
   ```
   "additionalLoginParams": [ "response_type=code id_token", "resource=https://graph.microsoft.com" ],
   ```

3. Click Put to save the settings.

## Development

In order to extend this component, clone the project and install the dependencies.

```bash
git clone https://github.com/unicef/react-easyauth.git
cd react-easyauth
npm install
```

The following commands are available: 

### `npm start`

Builds the component outputing it in the `dist` folder. It is refreshed everytime you make changes in the code.

```bash
npm start
```

To see the output in the browser run the example app ([/example](https://github.com/unicef/material-ui-currency-textfield/tree/master/example))

```bash
 cd example 
 npm install (only first time)
 npm start
 ```
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

It will reload automatically upon edits. Lint errors are also displayed on the console.


### `npm run build`

Outputs the build for production to the `dist` folder.

### `npm run styleguide`
Generates the documentation available on.

Open [http://localhost:6060](http://localhost:6060) to view it in the browser.

It watches for changes and automatically reloads the browser.

We use [styleguidelist](https://react-styleguidist.js.org/) for documenting our custom components.

### `npm run styleguide:build`
Builds the styleguide documentation for production. The output targets the `styleguide` folder.

## License

Copyright (c) 2019 UNICEF.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

