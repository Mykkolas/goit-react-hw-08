import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { Card, CardContent, Typography, IconButton, Box, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function Contact({ data }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(data.name);
    const [editedNumber, setEditedNumber] = useState(data.number);

    const handleDelete = () => dispatch(deleteContact(data.id));

    const handleEdit = () => setIsEditing(true);

    const handleSave = () => {
        dispatch(updateContact({ id: data.id, name: editedName, number: editedNumber }));
        setIsEditing(false);
    };

    return (
        <Card
            sx={{
                minWidth: 200,
                maxWidth: 250,
                maxHeight: 120,
                backgroundColor: '#fff',
                borderRadius: 3,
                boxShadow: 3,
                p: 1,
                mb: 2,
                position: 'relative',
            }}
        >
            <IconButton
                onClick={handleDelete}
                color="error"
                size="small"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }}
            >
                <DeleteIcon />
            </IconButton>

            <IconButton
                onClick={isEditing ? handleSave : handleEdit}
                color={isEditing ? "primary" : "default"}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 40,
                }}
            >
                {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>

            <CardContent sx={{
                mt: 3,
            }}   >
                <Box display="flex" alignItems="center" mb={1}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    {isEditing ? (
                        <TextField
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            size="small"
                            variant="standard"
                            fullWidth
                        />
                    ) : (
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }} >
                            {data.name}
                        </Typography>
                    )}
                </Box>

                <Box display="flex" alignItems="center">
                    <PhoneIcon color="primary" sx={{ mr: 1 }} />
                    {isEditing ? (
                        <TextField
                            value={editedNumber}
                            onChange={(e) => setEditedNumber(e.target.value)}
                            size="small"
                            variant="standard"
                            fullWidth
                        />
                    ) : (
                        <Typography variant="body1">
                            {data.number}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
