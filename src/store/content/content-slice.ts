import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iLoginPageContent } from '@/types/contentTypes';
import { getLoginPageContent } from '@/store/content/content-thunk';
import { rehydrateObject } from '@/utils/commonUtils';

export interface iContentStoreState {
  loginContent: iLoginPageContent;
}

const initialState: iContentStoreState = {
  loginContent: {} as iLoginPageContent,
};

const contentSlice = createSlice({
  name: 'content',
  initialState: initialState,
  reducers: {
    rehydrateContent(state, action: PayloadAction<iContentStoreState>) {
      rehydrateObject(state, action);
      // type iKey = keyof iContentStoreState;
      // for (let key in action.payload) {
      //   state[key as iKey] = action.payload[key as iKey];
      // }
    },
  },
  extraReducers(builder) {
    builder.addCase(getLoginPageContent.fulfilled, (state, action) => {
      state.loginContent = action.payload;
    });
  },
});

export const { rehydrateContent } = contentSlice.actions;

export default contentSlice.reducer;
