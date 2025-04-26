import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import s from './Navigation.module.css';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';


export const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav>
            <div className={s.wrapper}>
                <Button
                    component={NavLink}
                    to="/"
                    variant="contained"
                    startIcon={<HomeIcon />}
                    sx={{
                        background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '16px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
                        },
                    }}
                >
                    Home
                </Button>

                {isLoggedIn && (
                    <Button
                        component={NavLink}
                        to="/contacts"
                        variant="contained"
                        startIcon={<ContactsIcon />}
                        sx={{
                            background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '16px',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            marginLeft: 2,
                            '&:hover': {
                                background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
                            },
                        }}
                    >
                        Contacts
                    </Button>
                )}

            </div>
        </nav>
    );
};
