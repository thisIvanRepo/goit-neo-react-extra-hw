import type React from "react";
import {
  selectContacts,
  selectorUpdateContact,
} from "../../redux/contacts/selectors";
import { selectorFilters } from "../../redux/filters/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilters } from "../../redux/filters/slice";
import CreateFormContact from "../../components/CreateFormContact/CreateFormContact";
import { useEffect, useMemo } from "react";
import { contactsActions } from "@/redux/contacts/operations";
import {
  setUpadatingContact,
  type UpdateContactArgs,
} from "@/redux/contacts/slice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactsPages() {
  const contacts = useAppSelector(selectContacts);
  const updateContact = useAppSelector(selectorUpdateContact);
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

  const handleDeleteContact = (id: string) => {
    dispatch(contactsActions.fetchDeleteContact(id));
  };

  const handleUpdateUser = (id: string) => {
    const updatingContact = contacts.find((contact) => contact.id === id);
    if (updateContact?.id === id) {
      dispatch(setUpadatingContact(null));
    } else {
      dispatch(setUpadatingContact(updatingContact as UpdateContactArgs));
    }

    console.log(updateContact);
  };

  const handleChangeFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilters(event.target.value));
  };

  return (
    <div>
      <CreateFormContact />
      {contacts.length > 0 && (
        <label htmlFor="search">
          <Input
            className="max-w-110 mx-auto mb-[30px]"
            id="search"
            placeholder="Search contacts by name"
            value={filters}
            onChange={(e) => handleChangeFilters(e)}
          />
        </label>
      )}
      <div className="border p-10 rounded-3xl w-fit mx-auto mb-[10px]">
        {filterContacts.map((contact) => {
          return (
            <div
              className="flex flex-row gap-5 items-center min-w-100 justify-between px-[20px]
                border rounded-xl bg-linear-to-r from-gray-200 to-gray-100 px-[7px] py-[3px] mb-[10px] mx-0"
              key={contact.id}
            >
              <div className="flex gap-[10px]">
                <p className="text-gray-600">{contact.name}</p>
                <p className="text-gray-600">{contact.number}</p>
              </div>
              <div>
                <Button
                  className="mr-[10px] bg-red-400 text-white hover:bg-red-300 min-w-[80px]"
                  onClick={() => handleDeleteContact(contact.id as string)}
                >
                  delete
                </Button>
                <Button
                  className={`text-white min-w-[80px]
                     ${
                       updateContact?.id === contact.id
                         ? "bg-pink-400 hover:bg-pink-300"
                         : "bg-blue-400 hover:bg-blue-300"
                     }`}
                  onClick={() => handleUpdateUser(contact.id as string)}
                >
                  {updateContact?.id === contact.id ? "cancel" : "update"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
