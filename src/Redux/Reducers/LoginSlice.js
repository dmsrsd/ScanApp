// OrderListSlice.js
import {createSlice} from '@reduxjs/toolkit';

initialState = {
  item: null,
};

const loginSlice = createSlice({
  name: 'loginData',
  initialState,

  reducers: {
    setItem: (state, action) => {
      state.item = action.payload; // Simpan item ke state
    },
    clearLogin: state => {
      state.item = null; // Clear item
    },
  },
});

export const {setItem, clearLogin} = loginSlice.actions;
export default loginSlice.reducer;
