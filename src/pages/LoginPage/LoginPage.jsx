import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/operations";
import toast from "react-hot-toast";

const RegistrationPage = () => {
    const dispatch = useDispatch()
    const FeedbackSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").min(3, "Too short").max(40, "Too long").required("Required"),
        password: Yup.string().min(8, "Too short").max(20, "Too long").required("Required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(userLogin(values)).unwrap()
            toast.success("Successful login!")
            resetForm();
        }
        catch (err) {
            toast.error(`Failed to login: ${err}. Try again!`)
        }
    };
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                mt: { xs: 5, md: 10 }
            }}
        >
            <Card sx={{ maxWidth: 400, width: '90%', padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center" marginBottom={2}>
                        Login
                    </Typography>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
                        {({ errors, touched, isValid, dirty }) => (
                            <Form>
                                <Box mb={1}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email ? errors.email : " "}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password ? errors.password : " "}
                                    />
                                </Box>

                                <Button type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={!(isValid && dirty)}>
                                    Login
                                </Button>
                            </Form>

                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegistrationPage;
