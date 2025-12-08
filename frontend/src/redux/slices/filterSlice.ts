import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  cityName: string;
  location: string;
  rent: number | null;
  accommodationType: "flatmate" | "roommate" | "";
  lookingForGender: "male" | "female" | "any" | "";
}

const initialState: FilterState = {
  cityName: "",
  location: "",
  rent: null,
  accommodationType: "",
  lookingForGender: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
