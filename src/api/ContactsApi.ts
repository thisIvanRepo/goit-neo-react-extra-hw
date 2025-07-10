import type { Contact } from "@/redux/contacts/slice";
import privateApi from "./privateApi";

const fetchContacts = () => {
  return privateApi.get("/contacts") as Promise<{ data: Contact[] }>;
};

const fetchCreateContact = (contact: Contact) => {
  return privateApi.post("/contacts", contact) as Promise<{ data: Contact }>;
};

const fetchDeleteContact = (contact: Contact) => {
  return privateApi.delete(`/contacts/${contact.id}`);
};

export const ContactsApi = {
  fetchContacts,
  fetchCreateContact,
  fetchDeleteContact,
};
