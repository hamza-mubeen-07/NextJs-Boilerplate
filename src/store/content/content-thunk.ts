import { createAsyncThunk } from '@reduxjs/toolkit';
import { iThunkApi } from '@/types/commonTypes';
import { apiManager } from '@/service/apiManager';
import { iLoginPageContent } from '@/types/contentTypes';
import { CONTENT_API_ENDPOINTS } from '@/constants/contentApiEndpoint';

export const getLoginPageContent = createAsyncThunk<
  iLoginPageContent,
  string | undefined,
  iThunkApi
>('pet/getPetsList', async (locale, thunkAPI) => {
  const resp = await apiManager(
    CONTENT_API_ENDPOINTS.LOGIN_PAGE('en'),
    {},
    'GET',
    {}
  );
  if (resp.data.status === false) {
    return thunkAPI.rejectWithValue(resp.data);
  }
  return resp.data.data.attributes;
});
