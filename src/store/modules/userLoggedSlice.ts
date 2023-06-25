import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiService } from '../../services/api.service';
import { UserLoginTypes, UserTypes } from '../../types/UserTypes';

export const loginAction = createAsyncThunk('login/list', async (props: UserLoginTypes) => {
  const result = await ApiService.loginUser(props);

  return result;
});

const requestLoginSlice = createSlice({
  name: 'login',
  initialState: {} as UserTypes,
  reducers: {
    logout: state => {
      state.userId = '';
      state.username = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      console.log(action.payload.data ?? {});

      return action.payload.data ?? {};
    });
  }
});

export const { logout } = requestLoginSlice.actions;
export default requestLoginSlice.reducer;
