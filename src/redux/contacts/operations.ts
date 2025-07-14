import { ContactsApi } from "@/api/ContactsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError } from "../auth/operations";
import type { Contact, UpdateContactArgs } from "./slice";

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
  string,
  string,
  { rejectValue: string }
>("contacts/fetchDeleteContact", async (contactId, thunkAPI) => {
  try {
    await ContactsApi.fetchDeleteContact(contactId);

    return contactId;
  } catch (err) {
    const error = err as ApiError;

    return thunkAPI.rejectWithValue(
      error.message || "problem with deleting contact"
    );
  }
});

const fetchUpdateContact = createAsyncThunk<
  Contact,
  UpdateContactArgs,
  { rejectValue: string }
>("contacts/fetchUpdateContact", async ({ id, name, number }, thunkAPI) => {
  try {
    const response = await ContactsApi.fetchUpdateContact({
      id,
      name,
      number,
    });

    return response.data;
  } catch (err) {
    const error = err as ApiError;

    return thunkAPI.rejectWithValue(error.message || "foling update contact");
  }
});

export const contactsActions = {
  fetchContacts,
  fetchCreateContact,
  fetchDeleteContact,
  fetchUpdateContact,
};
