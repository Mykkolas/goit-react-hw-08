import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserMenu.module.css';
import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import toast from 'react-hot-toast';
export const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const handleLogout = async () => {
        try {
            await dispatch(userLogout()).unwrap()
            toast.success(`Log out successful!`)
        }
        catch (err) {
            toast.error(`Failed to logout: ${err}`)
        }
    }
    return (
        <div className={s.wrapper}>
            <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon color="#fff" />
                <Typography variant="subtitle1" color='#fff' sx={{
                    fontWeight: { xs: 200, md: 700 }, // 700 on mobile, 400 on medium and up
                }} >
                    Welcome, {user.name}
                </Typography>
            </Box>
            <Button
                type="button"
                onClick={() => handleLogout()}
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
