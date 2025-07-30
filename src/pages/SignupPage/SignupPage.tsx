import { Field, Form, Formik, type FieldProps } from "formik";
import { toast, Toaster } from "sonner";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { authActions } from "../../redux/auth/operations";
import { Link, useNavigate } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Enter your name"),
  email: yup.string().email("Enter a valid email").required(),
  password: yup.string().min(5).max(35).required(),
});

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Card className="max-w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            action.resetForm();

            const { name, email, password } = values;
            dispatch(authActions.fetchSignup({ name, email, password }))
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
              <label htmlFor="name">
                name
                <Field id="name" type="text" name="name">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div>
                        <Input
                          className="mb-1"
                          type="text"
                          {...field}
                          placeholder="First name"
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
              <label htmlFor="email">
                email
                <Field id="email" type="text" name="email">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div>
                        <Input
                          type="email"
                          className="mb-1"
                          {...field}
                          placeholder="Enter your email"
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
                pasword
                <Field id="password" type="text" name="password">
                  {({ field, meta }: FieldProps) => {
                    return (
                      <div>
                        <Input
                          type="password"
                          placeholder="enter your new pasword"
                          {...field}
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
                <Link to={"/"}>Home</Link>
              </Button>
            </CardAction>
            <CardFooter className="flex justify-center">
              <Button type="submit" className="min-w-70">
                Sign up
              </Button>
            </CardFooter>
          </Form>
        </Formik>
      </Card>

      <Toaster />
    </>
  );
}
