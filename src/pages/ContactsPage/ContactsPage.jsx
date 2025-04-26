import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
const ContactsPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    return (
        <>
            <ContactForm />
            <SearchBox />
            {/*   {isLoading && <Loader />} */}
            {/*   {error && <ErrorMessage>{error}</ErrorMessage>} */}
            <ContactList />
        </>
    )
}

export default ContactsPage