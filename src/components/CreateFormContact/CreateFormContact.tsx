import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectContacts,
  selectorUpdateContact,
} from "../../redux/contacts/selectors";
import * as yup from "yup";
import { contactsActions } from "@/redux/contacts/operations";
import type { Contact, UpdateContactArgs } from "@/redux/contacts/slice";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "../ui/button";

const initialValue: Contact = {
  id: "",
  name: "",
  number: "",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Enter a valid name")
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      "Must start with a capital letter and contain only letters"
    )
    .required(),
  number: yup
    .string()
    .matches(/^0/, "Number must start with 0")
    .min(10, "Enter a valid number of user. Thet must have 10 numbers")
    .required(),
});

export default function CreateFormContact() {
  const contacts = useAppSelector(selectContacts);
  const updatingContact = useAppSelector(selectorUpdateContact);
  const dispatch = useAppDispatch();

  const handlerSubbmit = (values: Contact, action: FormikHelpers<Contact>) => {
    console.log(values);
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
      <Card>
        <CardHeader>
          <CardTitle>Input new contact information</CardTitle>
        </CardHeader>
        <Formik
          initialValues={updatingContact ? updatingContact : initialValue}
          enableReinitialize={true}
          onSubmit={handlerSubbmit}
          validationSchema={validationSchema}
        >
          {({ isValid, dirty, isSubmitting }) => {
            return (
              <Form>
                <CardContent>
                  <label htmlFor="name">name</label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="enter name of contact"
                  >
                    {({ field, meta }: FieldProps) => {
                      return (
                        <div>
                          <Input {...field} type="text" />
                          {meta.touched && meta.error && (
                            <Alert
                              variant="destructive"
                              className="border-none"
                            >
                              <AlertDescription className="error">
                                {meta.error}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <ErrorMessage name="name" />
                  <label htmlFor="number">number</label>
                  <Field id="number" name="number">
                    {({ field, meta }: FieldProps) => {
                      return (
                        <div>
                          <InputOTP
                            id="number"
                            name="number"
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            maxLength={10}
                            value={field.value}
                            onChange={(value) => {
                              field.onChange({
                                target: {
                                  name: field.name,
                                  value,
                                },
                              });
                            }}
                            onBlur={field.onBlur}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                              <InputOTPSlot index={6} />
                              <InputOTPSlot index={7} />
                              <InputOTPSlot index={8} />
                              <InputOTPSlot index={9} />
                            </InputOTPGroup>
                          </InputOTP>

                          {meta.touched && meta.error && (
                            <Alert
                              variant="destructive"
                              className="border-none"
                            >
                              <AlertDescription className="error">
                                {meta.error}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <CardAction>
                    <Button
                      type="submit"
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      {updatingContact ? "Update" : "Create"}
                    </Button>
                  </CardAction>
                </CardContent>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}
