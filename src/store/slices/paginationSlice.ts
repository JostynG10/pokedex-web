import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PaginationState from "@/types/PaginationState";

const initialState: PaginationState = {
  currentOffset: 0,
  prevOffset: null,
  nextOffset: null,
  currentLimit: 10,
};

const paginationSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentOffset: (state, action: PayloadAction<number>) => {
      state.currentOffset = action.payload;
    },
    setPrevOffset: (state, action: PayloadAction<number | null>) => {
      state.prevOffset = action.payload;
    },
    setNextOffset: (state, action: PayloadAction<number | null>) => {
      state.nextOffset = action.payload;
    },
    setCurrentLimit: (state, action: PayloadAction<number>) => {
      state.currentLimit = action.payload;
    },
  },
});

export const {
  setCurrentOffset,
  setPrevOffset,
  setNextOffset,
  setCurrentLimit,
} = paginationSlice.actions;
export default paginationSlice.reducer;
