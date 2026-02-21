import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import type { ParisEvent } from '../types/event';

interface Props {
    event: ParisEvent;
    onDetailClick: () => void; // Bu satırı ekledik
}

const EventCard = ({ event, onDetailClick }: Props) => { // onDetailClick'i burada karşıladık
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
            {event.image_url && (
                <CardMedia
                    component="img"
                    height="180"
                    image={event.image_url}
                    alt={event.title}
                />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {event.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                        {event.date_start ? new Date(event.date_start).toLocaleDateString('tr-TR') : 'Tarih belirtilmedi'}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {event.address_name || 'Paris'}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    onClick={onDetailClick} // onClick artık modalı tetikliyor
                >
                    Detayları Gör
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;