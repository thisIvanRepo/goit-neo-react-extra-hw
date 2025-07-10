import { ContactsApi } from "@/api/ContactsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError } from "../auth/operations";
import type { Contact } from "./slice";

const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await ContactsApi.fetchContacts();

      return response.data;
    } catch (err) {
      const error = err as ApiError;

      return thunkAPI.rejectWithValue(error.message || "somthing when wrong");
    }
  }
);

const fetchCreateContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: string }
>("contacts/fetchCreateContact", async (contact, thunkAPI) => {
  try {
    const response = await ContactsApi.fetchCreateContact(contact);

    return response.data;
  } catch (err) {
    const error = err as ApiError;

    return thunkAPI.rejectWithValue(error.message || "foling create contact");
  }
});

const fetchDeleteContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: string }
>("contacts/fetchDeleteContact", async (contact, thunkAPI) => {
  try {
    const response = await ContactsApi.fetchDeleteContact(contact);

    return response.data;
  } catch (err) {
    const error = err as ApiError;

    return thunkAPI.rejectWithValue(
      error.message || "problem with deleting contact"
    );
  }
});

export const contactsActions = {
  fetchContacts,
  fetchCreateContact,
  fetchDeleteContact,
};
