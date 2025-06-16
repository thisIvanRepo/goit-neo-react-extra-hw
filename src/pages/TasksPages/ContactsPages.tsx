import type React from "react";
import { selectContacts } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/slice";
import { selectorFilters } from "../../redux/filters/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilters } from "../../redux/filters/slice";
import CreateFormContact from "../../components/CreateFormContact/CreateFormContact";

export default function ContactsPages() {
  const contacts = useAppSelector(selectContacts);
  const filters = useAppSelector(selectorFilters);

  const dispatch = useAppDispatch();

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleChangeFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilters(event.target.value));
    console.log(filters);
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
      {contacts.map((contact) => {
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
