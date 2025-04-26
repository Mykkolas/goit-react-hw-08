import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import styles from "../ContactList/ContactList.module.css"
import { selectFilteredContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
    const visibleContacts = useSelector(selectFilteredContacts)

    return (
        <div className={styles.outerContainer}>
            <ul className={styles.container}>
                {
                    visibleContacts.map(contact => (
                        <li key={contact.id}>
                            <Contact data={contact} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}