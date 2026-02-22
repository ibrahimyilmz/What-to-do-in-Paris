import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { ParisEvent } from '../types/event';

interface Props {
    event: ParisEvent | null;
    open: boolean;
    onClose: () => void;
}

const EventDetailsModal = ({ event, open, onClose }: Props) => {
    if (!event) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
            <DialogTitle sx={{ fontWeight: 'bold', pr: 6 }}>
                {event.title}
            </DialogTitle>

            <DialogContent dividers>
                {event.image_url && (
                    <Box component="img" src={event.image_url} alt={event.title} sx={{ width: '100%', borderRadius: 2, mb: 2 }} />
                )}

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip icon={<CalendarTodayIcon />} label={event.date_start ? new Date(event.date_start).toLocaleDateString('tr-TR') : 'Date Not Specified'} variant="outlined" />
                </Box>

                <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.7 }}>
                    {event.description || "No detailed description available for this event."}
                </Typography>

                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                        {event.address_name}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={onClose} color="inherit" sx={{ fontWeight: 'bold' }}>
                    Close
                </Button>
                <Button
                    variant="contained"
                    component="a"
                    href={event.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!event.url}
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    Visit Official Page
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventDetailsModal;