import { Field, Form, Formik, type FieldProps } from "formik";
import { toast, Toaster } from "sonner";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { authActions } from "../../redux/auth/operations";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      <Card className="max-w-[500px] mx-auto">
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
            <CardContent className="mb-5 flex flex-col gap-y-8">
              <label htmlFor="email">
                email
                <Field id="email" name="email">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div>
                        <Input
                          className="mb-1"
                          type="email"
                          {...field}
                          placeholder="First Name"
                        />
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
              </label>
              <label htmlFor="password">
                password
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                >
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div>
                        <Input
                          className="mb-1"
                          type="password"
                          {...field}
                          placeholder="First Name"
                        />
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
              </label>
            </CardContent>
            <CardAction className="w-full flex justify-center mb-3">
              <Button variant="link" asChild>
                <Link to={"/signup"}>Sign up</Link>
              </Button>
            </CardAction>
            <CardFooter className="flex justify-center">
              <Button
                type="submit"
                className="min-w-70"
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
