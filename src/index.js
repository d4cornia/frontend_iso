import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

// import {createStore,applyMiddleware,compose} from "redux";
// import rootReducer from "./store/reducers/rootReducer";
// import {Provider} from 'react-redux';
// import firebase from "firebase/compat";
// import {ReactReduxFirebaseProvider,getFirebase} from "react-redux-firebase";
// import {createFirestoreInstance,getFirestore,reduxFirestore} from "redux-firestore";
// import thunk from 'redux-thunk';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
