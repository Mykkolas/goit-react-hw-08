import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import { TextField, Box, Typography } from "@mui/material";

export default function SearchBox() {
    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);

    const handleFilterChange = (e) => {
        dispatch(changeFilter(e.target.value));
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={1} mb={5}>
            <Typography variant="p" gutterBottom textAlign="center" color="rgba(255, 255, 255, 0.8)" fontSize={13}>
                Find contacts by name or number
            </Typography>

            <TextField
                value={filter || ''}
                onChange={handleFilterChange}
                label="Search"
                variant="filled"
                fullWidth

                sx={{
                    boxShadow: 3,
                    maxWidth: 300,
                    backgroundColor: 'transparent',
                    borderRadius: 2,
                    overflow: 'hidden',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transaparent', // blue border
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2', // blue hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // blue focus
                            boxShadow: '0 0 5px #1976d2', // soft blue glow
                        },
                    },
                    '& .MuiInputBase-root': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                }}
            />
        </Box>

    );
}
