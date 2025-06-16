import type { RootState } from "../store";

export const selectContacts = (state: RootState) => state.contacts.contacts;