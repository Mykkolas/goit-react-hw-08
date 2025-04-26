import { Alert, Box, Typography } from "@mui/material";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const HomePage = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="90vh"
            textAlign="center"
            sx={{
                color: "white",
            }}
        >
            <ContactPhoneIcon sx={{ fontSize: 80, mb: 2 }} />

            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to Contacts Keeper!
            </Typography>

            <Typography variant="h6" component="p" mb={4}>
                Save your contacts safely. Easy login, fast access.
            </Typography>
            {isLoggedIn ? <Alert severity="success" variant="filled">
                Logged in successfully!
            </Alert> :
                <Alert severity="warning" variant="filled">
                    Proceed to authentication
                </Alert>
            }
        </Box>
    );
};

export default HomePage;
