import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { contactsActions } from "./operations";

// Define a type for the slice state
export interface Contact {
  id?: string;
  name: string;
  number: string;
}

export type UpdateContactArgs = {
  id: string;
  name: string;
  number: string;
};

interface ContactsState {
  contacts: Contact[];
  updatingContact: null | Contact;
  isLoadingContacts: boolean;
  isLoadingCreatingContact: boolean;
  isLoadingDeleteContact: boolean;
  error: string;
}

// Define the initial state using that type
const initialState: ContactsState = {
  contacts: [] as Contact[],
  updatingContact: null,
  isLoadingContacts: false,
  isLoadingCreatingContact: false,
  isLoadingDeleteContact: false,
  error: "",
};

export const contactsSlice = createSlice({
  name: "contacts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUpadatingContact(state, action: PayloadAction<UpdateContactArgs>) {
      state.updatingContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactsActions.fetchCreateContact.pending, (state) => {
        state.isLoadingCreatingContact = true;
      })
      .addCase(
        contactsActions.fetchCreateContact.fulfilled,
        (state, action) => {
          state.isLoadingCreatingContact = false;
          state.contacts.push(action.payload);
        }
      )
      .addCase(contactsActions.fetchCreateContact.rejected, (state, action) => {
        state.isLoadingCreatingContact = false;
        state.error = action.payload as string;
      })
      .addCase(contactsActions.fetchContacts.pending, (state) => {
        state.isLoadingContacts = true;
      })
      .addCase(contactsActions.fetchContacts.fulfilled, (state, action) => {
        state.isLoadingContacts = false;
        state.contacts = action.payload;
      })
      .addCase(contactsActions.fetchContacts.rejected, (state, action) => {
        state.isLoadingContacts = false;
        state.error = action.payload as string;
      })
      .addCase(contactsActions.fetchDeleteContact.pending, (state) => {
        state.isLoadingDeleteContact = true;
      })
      .addCase(
        contactsActions.fetchDeleteContact.fulfilled,
        (state, action) => {
          state.contacts = state.contacts.filter((contact) => {
            return contact.id !== action.payload;
          });
          state.isLoadingDeleteContact = false;
        }
      )
      .addCase(contactsActions.fetchDeleteContact.rejected, (state, action) => {
        state.isLoadingDeleteContact = false;
        state.error = action.payload as string;
      })
      .addCase(contactsActions.fetchUpdateContact.pending, (state) => {
        state.isLoadingCreatingContact = true;
      })
      .addCase(contactsActions.fetchUpdateContact.fulfilled, (state) => {
        state.updatingContact = null;
        state.isLoadingCreatingContact = false;
      })
      .addCase(contactsActions.fetchUpdateContact.rejected, (state, action) => {
        state.isLoadingCreatingContact = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUpadatingContact } = contactsSlice.actions;
export default contactsSlice.reducer;
