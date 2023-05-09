import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import petReducer from './pets/petSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pets: petReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
