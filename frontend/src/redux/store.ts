import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import listingReducer from "./slices/listingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
