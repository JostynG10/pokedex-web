import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OffsetsState from "@/types/OffsetsState";

const initialState: OffsetsState = {
  currentOffset: 0,
  prevOffset: null,
  nextOffset: null,
};

const pokemonSlice = createSlice({
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
  },
});

export const { setCurrentOffset, setPrevOffset, setNextOffset } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
