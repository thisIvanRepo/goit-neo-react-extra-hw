import { createSlice } from "@reduxjs/toolkit";

interface Filters {
  filters: string;
}

const initialState: Filters = {
  filters: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { changeFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
