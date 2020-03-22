import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { EasyAuthProvider } from '@unicef/react-easyauth'

import {authContext, apiFetch} from './authConfig.js'

const path='/test.json'
//const path='/api/offices'
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


/*
ReactDOM.render(
  <>
  </>
, document.getElementById('root'));
*/


  ReactDOM.render(
  <EasyAuthProvider authContext={authContext}>
    <App />
  </EasyAuthProvider>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
