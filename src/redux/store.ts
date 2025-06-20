import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice";
import filtersReduser from "./filters/slice";
import authReducer from "./auth/slice";
// ...

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReduser,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
