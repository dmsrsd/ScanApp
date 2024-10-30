import {configureStore} from '@reduxjs/toolkit';
import {usersApi} from '../API/api';
import orderListReducer from './Reducers/OrderListSlice';
import vehicleDataReducer from './Reducers/VehicleDataSlice';
import putAwayReducer from './Reducers/PutAwaySlice';
import loginReducer from './Reducers/LoginSlice';

import OutstandingReducer from './Reducers/OutstandingSlice';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    orderList: orderListReducer,
    vehicleData: vehicleDataReducer,
    putAwayList: putAwayReducer,
    loginData: loginReducer,
    outStandingData: OutstandingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
