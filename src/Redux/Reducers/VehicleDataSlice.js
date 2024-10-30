import {createSlice} from '@reduxjs/toolkit';

initialState = {
  itemVehicle: null,
};

const vehicleDataSlice = createSlice({
  name: 'itemVehicle',
  initialState,

  reducers: {
    setItemVehicle: (state, action) => {
      state.itemVehicle = action.payload;
    },
    clearItemVehicle: state => {
      state.itemVehicle = null;
    },
  },
});

export const {setItemVehicle, clearItemVehicle} = vehicleDataSlice.actions;
export default vehicleDataSlice.reducer;
