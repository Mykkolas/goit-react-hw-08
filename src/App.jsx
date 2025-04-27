import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Suspense, useEffect } from 'react'
import { RestrictedRoute } from './components/RestrictedRoute'
import { PrivateRoute } from './components/PrivateRoute'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { selectIsRefreshing } from './redux/auth/selectors'
import Loader from './components/Loader/Loader'
import { selectLoading } from './redux/contacts/selectors'
import { userRefresh } from './redux/auth/operations'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import { Toaster } from 'react-hot-toast'

function App() {
  const dispatch = useDispatch()
  const isRefreshing = useSelector(selectIsRefreshing)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(userRefresh())
  }, [dispatch])

  if (isRefreshing) {
    return <Loader loading={loading} />;
  }
  return (
    <Layout>
      <div><Toaster /></div>
      <Suspense>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/contacts'
            element={<PrivateRoute component={<ContactsPage />} />}
          />
          <Route
            path='/register'
            element={<RestrictedRoute component={<RegistrationPage />} />}
          />
          <Route
            path='/login'
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App