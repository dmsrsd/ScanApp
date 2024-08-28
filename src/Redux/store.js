import {configureStore} from '@reduxjs/toolkit';
import orderListReducer from './Reducers/OrderListSlice';


export const store = configureStore({
  reducer: {
    orderList: orderListReducer,
  },
});
