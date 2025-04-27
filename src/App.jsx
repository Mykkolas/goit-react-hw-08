import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { lazy, Suspense, useEffect } from 'react'
import { RestrictedRoute } from './components/RestrictedRoute'
import { PrivateRoute } from './components/PrivateRoute'
import { Route, Routes } from 'react-router-dom'
import { selectIsRefreshing } from './redux/auth/selectors'
import Loader from './components/Loader/Loader'
import { selectLoading } from './redux/contacts/selectors'
import { userRefresh } from './redux/auth/operations'
import Layout from './components/Layout/Layout'
import { Toaster } from 'react-hot-toast'
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));


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
      <Suspense fallback={<Loader loading={true} />}>
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