import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/auth/operations";

const RegistrationPage = () => {
    const dispatch = useDispatch()
    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(20, "Too Long!").required("Required"),
        email: Yup.string().email("Invalid email").min(3, "Too short").max(40, "Too long").required("Required"),
        password: Yup.string().min(8, "Too short").max(20, "Too long").required("Required"),
    });

    const initialValues = {
        email: "",
        name: "",
        password: "",
    };

    const handleSubmit = (values, { resetForm }) => {
        dispatch(userRegister(values))
        resetForm();
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                mt: { xs: 5, md: 10 }
            }}
        /*   bgcolor="#f0f2f5" */
        >
            <Card sx={{ maxWidth: 400, width: '90%', padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center" marginBottom={2}>
                        Register
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

                                <Box mb={1}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name ? errors.name : " "}
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
                                    Register
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
