// OrderListSlice.js
import {createSlice} from '@reduxjs/toolkit';

initialState = {
  item: null,
};

const orderListSlice = createSlice({
  name: 'orderList',
  initialState,

  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const {setItem} = orderListSlice.actions;
export default orderListSlice.reducer;
