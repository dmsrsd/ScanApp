// OrderListSlice.js
import {createSlice} from '@reduxjs/toolkit';

initialState = {
  item: null,
};

const putAwaySLice = createSlice({
  name: 'putAwayList',
  initialState,

  reducers: {
    setItem: (state, action) => {
      state.item = action.payload; // Simpan item ke state
    },
    clearPutaway: state => {
      state.item = null; // Clear item
    },
  },
});

export const {setItem, clearPutaway } = putAwaySLice.actions;
export default putAwaySLice.reducer;
