import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import { createContact } from "../../redux/contacts/slice";
import { nanoid } from "nanoid";

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

export default function CreateFormContact() {
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
    console.log(values);
  };

  return (
    <div>
      <h2>Input new contact information</h2>
      <Formik initialValues={initialValue} onSubmit={handlerSubbmit}>
        <Form>
          <label htmlFor="name">name </label>
          <Field id="name" name="name" placeholder="enter name of contact" />
          <label htmlFor="number">number </label>
          <Field
            id="number"
            name="number"
            placeholder="enter name of contact"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
