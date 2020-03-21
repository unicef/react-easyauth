import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
//import { EasyAuthProvider } from '@unicef/react-easyauth'

import {AuthContext, authFetch} from '@unicef/react-easyauth'

const config = {
  apiUrl: 'https://merlos.azurewebsites.net',  
  //apiUrl: 'https://xxx.azurewebsites.net',
  graphUrl: 'https://graph.microsoft.com'
}

const authContext = AuthContext(config.apiUrl)
console.log('authContext index', authContext)

const apiFetch = (path, options = {}) => {
  console.log("index.apiFetchPath: " + path)
  return authFetch(authContext, config.apiUrl + path, options)
}

const graphFetch = (path, options = {}) => {
  console.log("index.graphFetchPath: " + path)
  return authFetch(authContext, config.graphUrl + path, options)
}

//const path='/test.json'
const path='/api/offices'
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



ReactDOM.render(
  <>
  </>
, document.getElementById('root'));

/*
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

  ReactDOM.render(
  <EasyAuthProvider url={config.apiUrl} graphUrl = 'https://graph.microsoft.com'>
    <App />
  </EasyAuthProvider>
, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
*/

serviceWorker.unregister();
