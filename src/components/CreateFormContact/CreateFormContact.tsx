import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectContacts,
  selectorUpdateContact,
} from "../../redux/contacts/selectors";
import * as yup from "yup";
import { contactsActions } from "@/redux/contacts/operations";
import type { Contact, UpdateContactArgs } from "@/redux/contacts/slice";

const initialValue: Contact = {
  id: "",
  name: "",
  number: "",
};

const validationSchema = yup.object({
  name: yup.string().min(2, "Enter a valid name").required(),
  number: yup.string().min(5, "Enter a valid number of user"),
});

export default function CreateFormContact() {
  const contacts = useAppSelector(selectContacts);
  const updatingContact = useAppSelector(selectorUpdateContact);
  const dispatch = useAppDispatch();

  const handlerSubbmit = (values: Contact, action: FormikHelpers<Contact>) => {
    if (updatingContact) {
      console.log(values);
      dispatch(contactsActions.fetchUpdateContact(values as UpdateContactArgs));
    } else {
      dispatch(
        contactsActions.fetchCreateContact({
          ...values,
        })
      );
    }

    action.resetForm();
    console.log(contacts);
  };

  return (
    <div>
      <h2>Input new contact information</h2>
      <Formik
        initialValues={updatingContact ? updatingContact : initialValue}
        enableReinitialize={true}
        onSubmit={handlerSubbmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label htmlFor="name">name </label>
          <Field id="name" name="name" placeholder="enter name of contact" />
          <ErrorMessage name="name" />
          <label htmlFor="number">number </label>
          <Field
            id="number"
            name="number"
            placeholder="enter name of contact"
          />
          <ErrorMessage name="number" />

          <button type="submit">{updatingContact ? "Update" : "Create"}</button>
        </Form>
      </Formik>
    </div>
  );
}
