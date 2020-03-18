# React easy auth

`React easy auth` is a  [react](https://reactjs.org/) component. It provides single sign-on expereince to a react app using microsoft easy auth approach. 

`React easy auth` wraps the functionality of single sign on authentication to the react app.

Main features:
 * Enabale microsoft single sign-on using easy auth approach .
 * It can connect application api as well as graph/third party api.
 * apiFetch helps to call application api.
 * graphApiFetch helps to call graph/third party api

## Install

 ```bash
 npm install @unicef/react-easyauth --save
```

## Usage

```jsx static

# App.js
import React from 'react'
import { EasyAuthContext } from '@unicef/react-easyauth'

ReactDOM.render(
<EasyAuthProvider url = 'appurl' graphUrl = 'graphUrl'>
<App />
</EasyAuthProvider>
, document.getElementById('root'));


# In a component that requires easyAuth

import React from 'react'
import {EasyAuthContext} from '@unicef/react-easyauth'

export default function MyComponent() {

  const authContext = React.useContext(EasyAuthContext);
  
  apiFetch(authContext, url)
  
  return (
	<React.Fragment>
	</React.Fragment>
  );
}
```

## Development

In order to extend the component, clone the project and install the dependencies.
```bash
$ git clone https://github.com/unicef/react-easyauth.git
$ npm install
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

