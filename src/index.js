import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals';
import AuthService from './service/auth_service';
import DiaryRepository from './service/diary_repository';
import { firebaseApp, database } from './service/firebase';

import { store, persistor } from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import './index.css';

// auth를 디펜던시 인젝션해줌
const authService = new AuthService(firebaseApp);
const repositoryService = new DiaryRepository(database)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App authService={authService} repositoryService={repositoryService}/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
);

reportWebVitals();
