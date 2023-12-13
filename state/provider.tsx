'use client'

import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store';
import { Provider } from 'react-redux';

export function ReduxProvider({children} : {children: React.ReactNode}) {
    return  (<Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
)}


