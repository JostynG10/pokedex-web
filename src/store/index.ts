import { configureStore } from "@reduxjs/toolkit";
import offsetsReducer from "@/store/slices/offsetsSlice";

export const store = configureStore({
  reducer: {
    offset: offsetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
