# React EasyAuth [![npm](https://img.shields.io/npm/v/@unicef/react-easyauth.svg?style=flat-square)](https://www.npmjs.com/package/@unicef/react-easyauth)


React Easy Auth is a [react](https://reactjs.org/) simple solution for managing [Microsoft Azure AppService authentication](https://docs.microsoft.com/en-us/azure/app-service/overview-authentication-authorization). 

The library is pretty useful for React apps hosted in [Microsoft Azure App Services](https://azure.microsoft.com/en-us/services/app-service/) in which you only need to access the API of the same App Service. 

Main features:
 *  Much more simple to use than [Microsoft MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/README.md)
 * `useAuthFetch` hook for fetching data. It automatically refreshes the tokens
 * Can be used together with GraphAPI or other third party APIs 

 Limitations:
  - It only handles `aad` as authentication provider. But PR are welcome to support other providers :)
  - Microsoft only supports to have one single third party resource at a time (such as Graph API)


## Install

 ```bash
 npm install @unicef/react-easyauth --save
```

## Basic Usage

```jsx static
// index.js
import { EasyAuthProvider, AuthContext } from '@unicef/react-easyauth'

const authContext = AuthContext('http://yourappservice.azurewesites.net')

// Enclose the App within the EasyAuthProvider 
ReactDOM.render(
  <EasyAuthProvider authContext={authContext}>
    <App />
  </EasyAuthProvider>
  ,document.getElementById('root'));

```

Then in your Components you can call an authenticated fetch

```jsx static
// Component.js
import { useAuthFetch } from '@unicef/react-easyauth'

function Component {  
  const authFetch = useAuthFetch()

  const handleApiClick = () => {
    authFetch('https://xxx.azurewebsites.net/test.json') 
      .then(function (res) {
        if (res.ok)
          return res.json()
      })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return (
    <button onClick={() => handleApiClick()}>Call API</button>
  )
}
```

A working React App example is available in the example folder. 


# Advanced usage

You may need to access the authentication outside of your components, for example from your Redux middleware. Then this
this version is recommended:

```jsx static
//authConfig.js
import {AuthContext} from '@unicef/react-easyauth'

const config = {
  apiUrl: 'https://xxx.azurewebsites.net',  // <--- set your App Service URL
  graphUrl: 'https://graph.microsoft.com'
}

export const authContext = AuthContext(config.apiUrl)

//Defines a apiFetch
export const apiFetch = (path, options = {}) => {
  return authContext.authFetch(config.apiUrl + path, options)
}

export const graphFetch = (path, options = {}) => {
  return authContext.authFetch(config.graphUrl + path, options)
}

```


## Localhost restrictions

Although App Service Authentication simplifies handling the auth token, it does not fully simplify localhost development :( due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues.

A workaround is to ask your browser to skip CORS.

### Google Chrome Windows

1. Open a command Window and run chrome with the following arguments:

   ```bash
   "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp'
   ```

2. Open the react application on the new browser.

Note that creating a shortcut with that command in the target field may be pretty convenient.

### Google Chrome on OSX

For OSX:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

```

Optionally you can create an alias in your `~/bash_profile`:

```bash
echo Adding alias chromecors
alias chromecors='/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp'
```

After that whenever you open a terminal you will see Adding alias `chromecors`. Run that command to open Chrome in CORS free mode.

```bash
chromecors
```

### Google Chrome GNU/Linux

Find the path of chrome for your distribution

```bash
/path/to/chrome --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

You may also want to create an alias. See the OSX trick above.


# Enable third party APIs / Graph API
Initially, you can add third party APIs to your EasyAuth token so you don't need handle that yourself. However you need to do some changes in your App Service configuration:

In `https://portal.azure.com` 

1. In Azure AD Services / App Registrations, locate the application.
2. In API Permissions / options, add MS Graph `User.Read.All` or whatever [permission your app needs](https://docs.microsoft.com/en-us/graph/permissions-reference)
3. Check the box Admin consent.

In `https://resources.azure.com`

1. On the left browser click on subscriptions -> Subcription name -> resourceGroups -> resourceGroupName -> providers -> Microsoft.Web -> sites -> `<AppName>` -> config -> authsettings -> Edit

2. Update property `additionalLoginParams`. Replace
   
   ```json
   "additionalLoginParams": null,
   ```
   with

   ```json
   "additionalLoginParams": [ "response_type=code id_token", "resource=https://graph.microsoft.com" ],
   ```

3. Click Put to save the settings.


More info in this article: [Configuring an App Service to get an Access Token for AAD Graph API](https://blogs.msdn.microsoft.com/aaddevsup/2018/02/28/configuring-an-app-service-to-get-an-access-token-for-graph-api/)

Note that easy auth does not support getting access to multiple resources at one time using easy auth.

## Development

In order to extend this component, clone the project and install the dependencies.

```bash
git clone https://github.com/unicef/react-easyauth.git
cd react-easyauth
npm install
```

The following commands are available: 

### `npm start`

Builds the component in `dist/` folder and keeps it running in watch mode.

```bash
npm start
```

To see the output in a browser run the example app ([/example](https://github.com/unicef/material-ui-currency-textfield/tree/master/example))

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

## MIT License

Copyright (c) 2020 UNICEF.org

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

