import { RootState } from '@/store';

interface iError {
  message: string;
  status: boolean;
}

export interface iThunkApi {
  state: RootState;
  rejectValue: iError;
}
