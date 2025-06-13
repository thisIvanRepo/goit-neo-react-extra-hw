import {
  deleteContact,
  selectContacts,
} from "../../redux/contacts/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function TasksPages() {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
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
