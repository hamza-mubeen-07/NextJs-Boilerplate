import { iUserDetails } from '@/types/userTypes';
import { createSlice } from '@reduxjs/toolkit';
import { getUserDetailsThunk } from '@/store/user-store/userThunk';

export interface iUserStoreState {
  userDetails: iUserDetails;
}

const initialState: iUserStoreState = {
  userDetails: {} as iUserDetails,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logoutUser(state) {
      state.userDetails = initialState.userDetails;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getUserDetailsThunk.fulfilled,
      (state: iUserStoreState, action) => {
        state.userDetails = action.payload;
      }
    );
  },
});

export default userSlice.reducer;
