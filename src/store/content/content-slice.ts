import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iLoginPageContent } from '@/types/contentTypes';
import { rehydrateObject } from '@/utils/commonUtils';
import { getLoginPageContent } from '@/store/content/content-thunk';

export interface iContentStoreState {
  loginPage: iLoginPageContent;
}

const initialState: iContentStoreState = {
  loginPage: {} as iLoginPageContent,
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
    addLoginContent(state, action: PayloadAction<iLoginPageContent>) {
      state.loginPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getLoginPageContent.fulfilled, (state, action) => {
      state.loginPage = action.payload;
    });
  },
});

export const { rehydrateContent, addLoginContent } = contentSlice.actions;

export default contentSlice.reducer;
