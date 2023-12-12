import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice';
import priceReducer from './counter/priceSlice'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        price: priceReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;