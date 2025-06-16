import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createContact } from "../../redux/contacts/slice";
import { nanoid } from "nanoid";
import { selectContacts } from "../../redux/contacts/selectors";
import * as yup from "yup";

interface FormContact {
  id: string;
  name: string;
  number: string;
}

const initialValue: FormContact = {
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
  const dispatch = useAppDispatch();

  const handlerSubbmit = (
    values: FormContact,
    action: FormikHelpers<FormContact>
  ) => {
    dispatch(
      createContact({
        ...values,
        id: nanoid(),
      })
    );
    action.resetForm();
    console.log(contacts);
  };

  return (
    <div>
      <h2>Input new contact information</h2>
      <Formik
        initialValues={initialValue}
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

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
