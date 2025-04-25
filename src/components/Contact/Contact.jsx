import { useDispatch } from "react-redux"
import styles from "./Contact.module.css"
import { deleteContact } from "../../redux/contactsOps"
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
export default function Contact({ data }) {

    const dispatch = useDispatch()
    const handleDelete = () => dispatch(deleteContact(data.id))

    return (
        <div className={styles.container}>
            <div className={styles.common}>
                <div className={styles.phone}>
                    <span><FaUserAlt /></span>
                    <p>{data.name}</p>
                </div>
                <div className={styles.number}>
                    <span><FaPhoneAlt /></span>
                    <p>{data.number}</p>
                </div>
            </div>
            <button className={styles.delete} onClick={handleDelete}><RiDeleteBack2Fill /></button >
        </div >
    )
}