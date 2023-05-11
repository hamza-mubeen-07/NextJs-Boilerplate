import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '@/store/user/userSlice';
// import petReducer from '@/store/pets/petSlice';
import contentReducer from './content/content-slice';
export const store = configureStore({
  reducer: {
    // user: userReducer,
    // pets: petReducer,
    content: contentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
