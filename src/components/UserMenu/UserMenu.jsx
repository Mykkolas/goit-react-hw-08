import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserMenu.module.css';
import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
export const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <div className={s.wrapper}>
            <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon color="#fff" />
                <Typography variant="subtitle1" fontWeight={700} color='#fff'>
                    Welcome, {user.name}
                </Typography>
            </Box>
            <Button
                type="button"
                onClick={() => dispatch(userLogout())}
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                sx={{ textTransform: 'none', fontSize: '16px' }}
            >
                Logout
            </Button>
        </div>
    );
};
