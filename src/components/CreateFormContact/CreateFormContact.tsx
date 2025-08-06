import {
  Field,
  Form,
  Formik,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectorUpdateContact } from "../../redux/contacts/selectors";
import * as yup from "yup";
import { contactsActions } from "@/redux/contacts/operations";
import type { Contact, UpdateContactArgs } from "@/redux/contacts/slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { AlertCircleIcon } from "lucide-react";

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
    .min(10, "Thet must have 10 numbers")
    .required(),
});

export default function CreateFormContact() {
  const updatingContact = useAppSelector(selectorUpdateContact);
  const dispatch = useAppDispatch();

  const handlerSubbmit = (values: Contact, action: FormikHelpers<Contact>) => {
    console.log(values);
    if (updatingContact) {
      dispatch(contactsActions.fetchUpdateContact(values as UpdateContactArgs));
    } else {
      dispatch(
        contactsActions.fetchCreateContact({
          ...values,
        })
      );
    }

    action.resetForm();
  };

  return (
    <Card className="max-w-110 mx-auto mb-[40px]">
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
            <Form className="flex mx-auto">
              <CardContent className=" flex justify-items-start flex-col">
                <label className="w-fit" htmlFor="name">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="enter name of contact"
                >
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div className="mb-[20px]">
                        <Input {...field} type="text" className="mb-[3px]" />
                        {meta.touched && meta.error && (
                          <Alert variant="destructive" className="border-none">
                            <AlertDescription className="error">
                              {meta.error}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    );
                  }}
                </Field>
                <label className="w-fit" htmlFor="number">
                  Number
                </label>
                <Field id="number" name="number">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div className="mb-[35px]">
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
                          <Alert variant="destructive" className="border-none">
                            <AlertDescription className="error">
                              {meta.error}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    );
                  }}
                </Field>
                {(!isValid || !dirty || isSubmitting) && !updatingContact ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="mx-auto max-w-[144px]">
                          <Button
                            type="submit"
                            className="pointer-events-none opacity-50 w-full min-w-[80px]"
                          >
                            Create
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <Alert variant="destructive" className="mb-[5px]">
                          <AlertCircleIcon />
                          <AlertDescription>
                            <p>Please enter name and number.</p>
                          </AlertDescription>
                        </Alert>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button
                    className="mx-auto max-w-[144px] min-w-[80px]"
                    type="submit"
                  >
                    {updatingContact ? "Update" : "Create"}
                  </Button>
                )}
              </CardContent>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
}
