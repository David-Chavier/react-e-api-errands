import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiResponse, ApiService } from '../../services/api.service';
import RequestLoginTypes from '../../types/RequestLoginTypes';
import { UserTypes } from '../../types/UserTypes';

export const createUsersAction = createAsyncThunk('register/create', async (props: RequestLoginTypes) => {
  const result = await ApiService.createUser(props);

  return result;
});

const requestRegisterSlice = createSlice({
  name: 'register',
  initialState: {} as UserTypes,
  reducers: {
    registerOff: state => {
      state.id = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(createUsersAction.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      console.log(action.payload.data ?? {});

      return action.payload.data ?? {};
    });
  }
});

export const { registerOff } = requestRegisterSlice.actions;
export default requestRegisterSlice.reducer;
