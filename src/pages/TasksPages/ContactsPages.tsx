import type React from "react";
import { selectContacts } from "../../redux/contacts/selectors";
import { selectorFilters } from "../../redux/filters/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilters } from "../../redux/filters/slice";
import CreateFormContact from "../../components/CreateFormContact/CreateFormContact";
import { useEffect, useMemo } from "react";
import { contactsActions } from "@/redux/contacts/operations";
import type { Contact } from "@/redux/contacts/slice";

export default function ContactsPages() {
  const contacts = useAppSelector(selectContacts);
  const filters = useAppSelector(selectorFilters);

  const filterContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filters.trim().toLowerCase())
    );
  }, [filters, contacts]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(contactsActions.fetchContacts())
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleDeleteContact = (contact: Contact) => {
    dispatch(contactsActions.fetchDeleteContact(contact));
  };

  const handleChangeFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilters(event.target.value));
  };

  return (
    <div>
      <CreateFormContact />
      {contacts.length > 0 && (
        <label htmlFor="search">
          search contacts by name
          <input
            id="search"
            value={filters}
            onChange={(e) => handleChangeFilters(e)}
          />
        </label>
      )}
      {filterContacts.map((contact) => {
        return (
          <div key={contact.id}>
            <span>
              {contact.name}
              <br />
            </span>
            <button onClick={() => handleDeleteContact(contact)}>
              delete contact
            </button>
          </div>
        );
      })}
    </div>
  );
}
