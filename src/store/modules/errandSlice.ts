import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiService } from '../../services/api.service';
import ListErrandsTypes from '../../types/ListErrandsTypes';
import { CreateErrandTypes, DeleleErrandTypes, ErrandsTypes, UpdateErrandtypes } from '../../types/ErrandsTypes';

export const listErrandAction = createAsyncThunk('errands/list', async (props: ListErrandsTypes) => {
  const result = await ApiService.listErrands(props);
  result.data.reverse();
  return result;
});

export const createErrandAction = createAsyncThunk('errands/create', async (props: CreateErrandTypes) => {
  const result = await ApiService.createErrands(props);
  result.data.reverse();
  return result;
});

export const updateErrandAction = createAsyncThunk('errands/update', async (props: UpdateErrandtypes) => {
  const result = await ApiService.updateErrands(props);
  result.data.reverse();
  return result;
});

export const deleteErrandAction = createAsyncThunk('errands/delete', async (props: DeleleErrandTypes) => {
  const result = await ApiService.deleteErrands(props);
  result.data.reverse();
  return result;
});

const requestErrandSlice = createSlice({
  name: 'errands',
  initialState: [] as ErrandsTypes[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(listErrandAction.fulfilled, (state, action) => {
      console.log(action.payload.data ?? []);
      return action.payload.data ?? [];
    });

    builder.addCase(createErrandAction.fulfilled, (state, action) => {
      return action.payload.data ?? [];
    });

    builder.addCase(deleteErrandAction.fulfilled, (state, action) => {
      return action.payload.data ?? [];
    });

    builder.addCase(updateErrandAction.fulfilled, (state, action) => {
      console.log(action.payload.data ?? []);
      return action.payload.data ?? [];
    });
  }
});

export default requestErrandSlice.reducer;
