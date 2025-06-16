import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
type Contact = {
  id: string;
  name: string;
  number: string;
};

interface ContactsState {
  contacts: Contact[];
}

const mockedContacts = [
  {
    id: "1",
    name: "Ivan",
    number: "12-12-12",
  },
];

// Define the initial state using that type
const initialState: ContactsState = {
  contacts: mockedContacts,
};

export const contactsSlice = createSlice({
  name: "contacts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    createContact: (state, action) => {
      state.contacts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUserById.pending, (state, action) => {
    //   // both `state` and `action` are now correctly typed
    //   // based on the slice state and the `pending` action creator
    // });
  },
});

export const { deleteContact, createContact } = contactsSlice.actions;

export default contactsSlice.reducer;
