import { combineReducers } from '@reduxjs/toolkit';
import register from './registerSlice';
import login from './userLoggedSlice';
import errand from './errandSlice';

export default combineReducers({
  register,
  login,
  errand
});
