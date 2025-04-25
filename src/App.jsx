import './App.css'
import ContactForm from '../src/components/ContactForm/ContactForm'
import ContactList from '../src/components/ContactList/ContactList'
import SearchBox from '../src/components/SearchBox/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoading, selectError } from './redux/contactsSlice'
import { useEffect } from 'react'
import { fetchContacts } from './redux/contactsOps'
function App() {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        {loading && !error && <b>Loading!!!</b>}
        <ContactList />
      </div>
    </>
  )
}

export default App