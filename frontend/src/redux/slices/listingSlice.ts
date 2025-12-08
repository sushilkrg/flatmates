import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalListings: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ListingsState {
  listings: any[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
}

const initialState: ListingsState = {
  listings: [],
  loading: false,
  error: null,
  pagination: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (
      state,
      action: PayloadAction<{ results: any[]; pagination: PaginationMeta }>
    ) => {
      state.listings = action.payload.results;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearListings: (state) => {
      state.listings = [];
      state.pagination = null;
      state.error = null;
    },
  },
});

export const { setListings, setLoading, setError, clearListings } =
  listingsSlice.actions;
export default listingsSlice.reducer;
