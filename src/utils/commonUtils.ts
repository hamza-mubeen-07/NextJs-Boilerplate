import { PayloadAction } from '@reduxjs/toolkit';

export const rehydrateObject = <T>(state: T, action: PayloadAction<T>) => {
  type iKey = keyof T;
  for (let key in action.payload) {
    state[key as iKey] = action.payload[key as iKey];
  }
};
