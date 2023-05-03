import { createAsyncThunk } from '@reduxjs/toolkit';
import { iUserDetails } from '@/types/userTypes';
import { iThunkApi } from '@/types/commonTypes';
import { apiManager } from '@/service/apiManager';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const getUserDetailsThunk = createAsyncThunk<
  iUserDetails,
  string,
  iThunkApi
>('user/getDetails', async (id, thunkAPI) => {
  // const state = thunkAPI.getState();
  const resp = await apiManager(API_ENDPOINTS.GET_USER_DETAILS(id), {}, 'GET', {
    Authorization: '',
  });
  if (resp.data.status === false) {
    return thunkAPI.rejectWithValue(resp.data);
  }
  return resp.data.user;
});
