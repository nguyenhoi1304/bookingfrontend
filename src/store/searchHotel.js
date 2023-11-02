import { createSlice } from "@reduxjs/toolkit";

const initState = {
  city: undefined,
  dates: [],
  options: { adult: undefined, children: undefined, room: undefined },
};
const searchHotelSlice = createSlice({
  name: "searchHotel",
  initialState: initState,
  reducers: {
    SEARCH_CITY: (state, action) => {
      state.city = action.payload;
    },
    SEARCH_DATES: (state, action) => {
      state.dates = action.payload;
    },
    SEARCH_OPTIONS: (state, action) => {
      state.options = action.payload;
    },
  },
});

export const searchActions = searchHotelSlice.actions;
export default searchHotelSlice.reducer;
