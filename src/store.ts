import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "app/auth/store/auth.slice";
import { adminSlice } from "app/admin/store/admin.slice";




const store = configureStore({
  reducer: {
   
    auth: authSlice.reducer,
    users: adminSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
