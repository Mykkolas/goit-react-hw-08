import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
const NotFoundPage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={15}
            textAlign="center"
        >
            <Typography variant="h4" color='#fff' gutterBottom>
                Seems like this URL is not valid
            </Typography>

            <Button
                component={NavLink}
                to="/"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                Return Home
            </Button>
        </Box>
    )
}

export default NotFoundPage