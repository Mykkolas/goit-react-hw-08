import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { Card, CardContent, Typography, IconButton, Box, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import toast from "react-hot-toast";



export default function Contact({ data }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(data.name);
    const [editedNumber, setEditedNumber] = useState(data.number);
    const [isVisible, setIsVisible] = useState(false); // NEW
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50); // Small delay to trigger the animation
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = async () => {
        setIsVisible(false); // starting animation
        setTimeout(async () => { // giving time for animation
            try {
                await dispatch(deleteContact(data.id)).unwrap();
                toast.success(`Contact ${data.name} deleted!`);
            } catch (error) {
                toast.error(`Failed to delete contact: ${error}`);
            }
        }, 300);
    };


    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        try {
            await dispatch(updateContact({ id: data.id, name: editedName, number: editedNumber })).unwrap();
            toast.success(`Contact ${editedName} updated!`);
            setIsEditing(false);
        } catch (err) {
            toast.error(`Failed to update contact: ${err}`);
        }
    };


    return (
        <Card
            sx={{
                minWidth: 230,
                maxWidth: 260,
                maxHeight: 120,
                backgroundColor: '#fff',
                borderRadius: 3,
                boxShadow: 3,
                position: 'relative',
                marginBottom: 2,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)'
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
