import { createAsyncThunk } from '@reduxjs/toolkit';
import { iThunkApi } from '@/types/commonTypes';
import { apiManager } from '@/service/apiManager';
import { iLoginPageContent } from '@/types/contentTypes';
import { CONTENT_API_ENDPOINTS } from '@/constants/contentApiEndpoint';
import { iAllowedLocale } from '@/constants/commonConstant';

export const getLoginPageContent = createAsyncThunk<
  iLoginPageContent,
  iAllowedLocale | undefined,
  iThunkApi
>('pet/getPetsList', async (locale, thunkAPI) => {
  const resp = await apiManager(
    CONTENT_API_ENDPOINTS.LOGIN_PAGE(locale),
    {},
    'GET',
    {}
  );
  if (resp.data.status === false) {
    return thunkAPI.rejectWithValue(resp.data);
  }
  return resp.data.data.attributes;
});
