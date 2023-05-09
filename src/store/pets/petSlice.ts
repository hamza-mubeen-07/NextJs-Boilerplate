import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPetsList } from '@/store/pets/petThunks';

export interface iPets {
  name: string;
  url: string;
}

export interface iPetsStoreState {
  petsList: iPets[];
}

const initialState: iPetsStoreState = {
  petsList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<iPetsStoreState>) {
      state.petsList = action.payload.petsList;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPetsList.fulfilled, (state: iPetsStoreState, action) => {
      state.petsList = action.payload;
    });
  },
});

export const { rehydrate } = userSlice.actions;

export default userSlice.reducer;
