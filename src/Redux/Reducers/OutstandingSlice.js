// OrderListSlice.js
import {createSlice} from '@reduxjs/toolkit';

initialState = {
  dataOutStanding: null,
};

const outStandingSlice = createSlice({
  name: 'dataOutStanding',
  initialState,

  reducers: {
    setItem: (state, action) => {
      state.dataOutStanding = action.payload;
    },
    clearPutaway: state => {
      state.dataOutStanding = null;
    },
  },
});

export const {setItem, clearPutaway} = outStandingSlice.actions;
export default outStandingSlice.reducer;
