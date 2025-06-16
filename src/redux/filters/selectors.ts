import type { RootState } from "../store";

export const selectorFilters = (state: RootState) => state.filters.filters;
