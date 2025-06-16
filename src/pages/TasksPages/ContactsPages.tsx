import type React from "react";
import { selectContacts } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/slice";
import { selectorFilters } from "../../redux/filters/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilters } from "../../redux/filters/slice";
import CreateFormContact from "../../components/CreateFormContact/CreateFormContact";
import { useMemo } from "react";

export default function ContactsPages() {
  const contacts = useAppSelector(selectContacts);
  const filters = useAppSelector(selectorFilters);
  const filterContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filters.trim().toLocaleLowerCase())
    );
  }, [filters, contacts]);

  const dispatch = useAppDispatch();

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
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
            <span>{contact.name}</span>
            <button onClick={() => handleDeleteContact(contact.id)}>
              delete contact
            </button>
          </div>
        );
      })}
    </div>
  );
}
