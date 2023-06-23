import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiService } from '../../services/api.service';
import ListErrandsTypes from '../../types/ListErrandsTypes';
import ErrandsTypes from '../../types/ErrandsTypes';

export const listErrandAction = createAsyncThunk('errands/list', async (props: ListErrandsTypes) => {
  const result = await ApiService.listErrands(props);

  return result;
});

const requestErrandSlice = createSlice({
  name: 'errands',
  initialState: [] as ErrandsTypes[],
  reducers: {
    // logout: state => {
    //   state.id = '';
    //   state.username = '';
    // }
  },
  extraReducers(builder) {
    builder.addCase(listErrandAction.fulfilled, (state, action) => {
      console.log(action.payload.data ?? []);

      return action.payload.data ?? [];
    });
  }
});

// export const { logout } = requestLoginSlice.actions;
export default requestErrandSlice.reducer;
