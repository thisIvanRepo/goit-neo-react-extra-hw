import { Field, Form, Formik } from "formik";
import { toast, Toaster } from "sonner";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { authActions } from "../../redux/auth/operations";
import { useNavigate } from "react-router";

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
          <label htmlFor="email">
            email
            <Field id="email" type="text" name="email" />
          </label>
          <label htmlFor="password">
            pasword
            <Field id="password" type="text" name="password" />
          </label>
          <button type="submit">log in</button>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
}
