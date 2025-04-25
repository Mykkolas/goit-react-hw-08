import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css"
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

export default function ContactForm() {
    const dispatch = useDispatch()

    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        number: Yup.string().min(3, "Too short").max(50, "Too long").required("Required"),
    });

    const initialValues = {
        name: "",
        number: "",
    };

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addContact({
            id: values.id,
            name: values.name,
            number: values.number
        }));
        resetForm();
    };


    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            {({ isValid }) => (
                <Form>
                    <div className={styles.innercontainer}>
                        <div className={styles.contacts}>
                            <label htmlFor="name">Name</label>
                            <Field type="text" name="name" id="name" />
                            <ErrorMessage name="name" component="div" className={styles.error} />

                            <label htmlFor="number">Phone</label>
                            <Field type="tel" name="number" id="number" />
                            <ErrorMessage name="number" component="div" className={styles.error} />

                        </div>
                        <button type="submit" disabled={!isValid} className={styles.btn}>
                            Add contact
                        </button>
                    </div>

                </Form>
            )
            }
        </Formik >
    );
}