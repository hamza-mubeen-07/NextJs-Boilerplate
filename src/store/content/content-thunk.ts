import { createAsyncThunk } from '@reduxjs/toolkit';
import { iThunkApi } from '@/types/commonTypes';
import { apiManager } from '@/service/apiManager';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { iLoginPageContent } from '@/types/contentTypes';

export const getLoginPageContent = createAsyncThunk<
  iLoginPageContent,
  undefined,
  iThunkApi
>('pet/getPetsList', async (args, thunkAPI) => {
  const resp = await apiManager(API_ENDPOINTS.GET_PETS, {}, 'GET', {});
  if (resp.data.status === false) {
    return thunkAPI.rejectWithValue(resp.data);
  }
  console.log(resp.data);
  return resp.data.results;
});
