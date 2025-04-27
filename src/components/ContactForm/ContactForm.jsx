import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";

export default function ContactForm() {
    const dispatch = useDispatch()

    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        number: Yup.string().matches(/^[0-9]+$/, "Must be a valid phone number").required("Required"),
    });

    const initialValues = {
        name: "",
        number: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(addContact({
                id: values.id,
                name: values.name,
                number: values.number
            })).unwrap();
            toast.success(`Contact ${values.name} added!`)
        }
        catch (err) {
            toast.error(`Failed to add new contact: ${err.message || err}`)
        }

        resetForm();
    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="35vh"
            mt={2}
        >
            <Box
                sx={{
                    maxWidth: 300,
                    width: "100%",
                    backgroundColor: "#fff",
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={FeedbackSchema}
                >
                    {({ isValid, errors, touched }) => (
                        <Form>
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Field
                                    name="name"
                                    as={TextField}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name ? errors.name : " "}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                        },
                                    }}
                                />

                                <Field
                                    name="number"
                                    as={TextField}
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(touched.number && errors.number)}
                                    helperText={touched.number && errors.number ? errors.number : " "}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2',
                                            },
                                        },
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        fontWeight: 600,
                                        padding: "10px 0",
                                        '&:hover': {
                                            backgroundColor: '#1565c0',
                                        },
                                    }}
                                    disabled={!isValid}
                                >
                                    Add Contact
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}