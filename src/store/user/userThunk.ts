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
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OGViZDQ2Mi0wODY0LTQ1ZTMtODNlNS0zNjBiODJmMTk5NTEiLCJqdGkiOiI0ZjBmNTRiMzc2MWQyYTljMmZiNTA1ZDY2MmRlMzkzOTVmNDAxMTY4ODRjNDU5M2YzNGRiNjFhNjNmZDAxMDYwY2Q2MmVmNjQ4ODkwZTY1NiIsImlhdCI6MTY4MzExODI0MS45NjUwNDUsIm5iZiI6MTY4MzExODI0MS45NjUwNDksImV4cCI6MTcxNDc0MDY0MS45NTY3MjksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.XU9idHN7wAt6Hg9lLMrGq8_eH8kyvXOXUrH20gyGXdpAOSdHFKGyu2Sr_4SS989nUSAqFMoyIcdBMpvcUZzaS0g7t4KuafletbrmngEyFrMxV3sw8gmy9ybDoS1rYoqdlBKKY-Kza0cAcKU44bkP-izjZhHmZ1eiwKTA5WdEKz3OyrGDrh9XFUDXf6SyVS7d44Pr-slckLOJpQ7Nd4VvvdQeFKGUiXVBwma6aCzVA8wqrflzHjcGK_7YZZhHgVm4m9q8wtgUCqLVjHpsEy9nM1EZrv0q6fgtYgyTEEs9SycAVwSR3QDCssoA_XFvA0Hae6__dGJSoM9-M76hAMsqm1Qsg_bwhA3W4EEuzBE2kruACJJW1YE8d518OzJEIPXy2tn8GVTFFbc1U6t4pN68-TEaAk27Q94AlqBDSux0d32B6akYUJ1uPYweRfyS0prGgHYJek1vaQnlVgUVp2aPXA9YjIEN4NLFFTfYAHM26dnv-8Xofpuxl3ktcELY8LcnEFkYUleR5PqI5zOrYmjQSrFBcQT4D8C4Os6NWDjGmKWPRtRrOzwdcYlgNeq80AAHnImdKiVnZaqOQD4xJrivRdf9w78W5nBBR_KQoHGv9hT9xjJSn3-uU7XorAXC_-CFusk4MZ3yWaZSUiI6G2vBzstRaA2UM3ebcz5JiLEWbT8',
  });
  if (resp.data.status === false) {
    return thunkAPI.rejectWithValue(resp.data);
  }
  return resp.data.user;
});
