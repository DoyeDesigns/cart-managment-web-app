import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice';
import priceReducer from './counter/priceSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import couponReducer from "./counter/couponSlice";

const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, priceReducer);


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        price: persistedReducer,
        coupon: couponReducer,
    },
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;