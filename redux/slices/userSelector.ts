import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const selectUser = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.isLoggedIn
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.isLoading
);

export const selectError = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.error
);
