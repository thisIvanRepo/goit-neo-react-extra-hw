import { Field, Form, Formik, type FieldProps } from "formik";
import { toast, Toaster } from "sonner";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { authActions } from "../../redux/auth/operations";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialState = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required(),
  password: yup.string().min(5).max(35).required(),
});

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            action.resetForm();

            const { email, password } = values;
            dispatch(authActions.fetchLogIn({ email, password }))
              .unwrap()
              .then(() => {
                navigate("/");
              })
              .catch((err) => {
                toast.error(err);
              });
          }}
        >
          <Form>
            <CardContent>
              <label htmlFor="email">
                email
                <Field id="email" name="email">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div>
                        <Input
                          type="text"
                          {...field}
                          placeholder="First Name"
                        />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    );
                  }}
                </Field>
              </label>
              <label htmlFor="password">
                password
                <Field
                  id="password"
                  type="text" //will chenge to "password"
                  name="password"
                  placeholder="password"
                >
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div>
                        <Input
                          type="text"
                          {...field}
                          placeholder="First Name"
                        />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    );
                  }}
                </Field>
              </label>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                onClick={() => {
                  console.log("working");
                }}
              >
                log in
              </Button>
            </CardFooter>
          </Form>
        </Formik>
      </Card>

      <Toaster />
    </>
  );
}
