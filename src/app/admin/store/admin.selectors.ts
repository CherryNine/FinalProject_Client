import { RootState } from 'store';
export const usersSelector = (state: RootState) => state.users.users;
export const usersLoadingSelector = (state: RootState) => state.users.pending;
export const usersErrorSelector = (state: RootState) => state.users.errors;
