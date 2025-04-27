import { AppBar as MuiAppBar, Toolbar, Container, Box } from '@mui/material';
import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../UserMenu/UserMenu';
import { AuthNav } from '../AuthNav/AuthNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const AppBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <MuiAppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 0 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '64px', flexDirection: { xs: 'column', md: 'row' }, // <--- here
                    gap: { xs: 2, md: 0 },
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Navigation />
                    </Box>
                    <Box>
                        {isLoggedIn ? <UserMenu /> : <AuthNav />}
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};

export default AppBar;
