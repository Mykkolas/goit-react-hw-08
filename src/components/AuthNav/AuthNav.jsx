import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';
import { Box, Button } from '@mui/material';

export const AuthNav = () => {
    return (
        <div className={s.wrapper}>
            <Box display="flex" gap={5}>
                <Button
                    component={NavLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "none", fontSize: "16px", paddingX: 3 }}
                >
                    Register
                </Button>

                <Button
                    component={NavLink}
                    to="/login"
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "none", fontSize: "16px", paddingX: 3, borderColor: "#9c28b1" }}
                >
                    Log In
                </Button>
            </Box>
        </div>
    );
};
