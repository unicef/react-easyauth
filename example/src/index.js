import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Easy Auth Imports 
import { EasyAuthProvider } from '@unicef/react-easyauth'
import {authContext, apiFetch} from './authConfig.js'

// If you need to access the API outside of the EasyAuthContext 
// you can use the functions defined in authConfig
// 
const path='/test.json'
apiFetch(path).then(res => {
  console.log('index.apiFetch res:', res)
  console.log('authContext api fetch', authContext)
  if (res.ok) {  
    return res.json()
  } 
  throw Error(res.statusText)   
})
.then(data => { 
  console.log('index.apiFetch.data:', data)
}).catch(error =>  {
  console.log(error)
})

// Enclose the App within the EasyAuthProvider 
ReactDOM.render(
  <EasyAuthProvider authContext={authContext}>
    <App />
  </EasyAuthProvider>
  ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
