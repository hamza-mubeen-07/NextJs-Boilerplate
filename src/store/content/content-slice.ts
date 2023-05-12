import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iLoginPageContent } from '@/types/contentTypes';
import { rehydrateObject } from '@/utils/commonUtils';
import { getLoginPageContent } from '@/store/content/content-thunk';
import { DEFAULT_LOCALE, iAllowedLocale } from '@/constants/commonConstant';

export interface iContentStoreState {
  lang: iAllowedLocale;
  loginPage: iLoginPageContent;
}

const initialState: iContentStoreState = {
  lang: DEFAULT_LOCALE,
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
    updateLang(state, action: PayloadAction<iAllowedLocale>) {
      state.lang = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getLoginPageContent.fulfilled, (state, action) => {
      state.loginPage = action.payload;
    });
  },
});

export const { rehydrateContent, updateLang } = contentSlice.actions;

export default contentSlice.reducer;
