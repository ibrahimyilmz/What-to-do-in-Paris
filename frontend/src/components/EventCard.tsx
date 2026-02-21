import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import type { ParisEvent } from '../types/event';

const GOOGLE_MAPS_SEARCH_BASE = 'https://www.google.com/maps/search/?api=1&query=';
const DEFAULT_LOCATION = 'Paris';

interface Props {
    event: ParisEvent;
    onDetailClick: () => void;
}

const EventCard = ({ event, onDetailClick }: Props) => {

    const getGoogleMapsUrl = (lat?: number, lon?: number, address?: string) => {
        if (lat && lon) {
            return `${GOOGLE_MAPS_SEARCH_BASE}${lat},${lon}`;
        }
        return `${GOOGLE_MAPS_SEARCH_BASE}${encodeURIComponent(address || DEFAULT_LOCATION)}`;
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                position: 'relative' // KRİTİK: Rozetin kartın içinde kalmasını sağlar
            }}
        >
            {/* Ücretsiz Etkinlik Rozeti - Resmin üzerine biner */}
            {event.price_type === 'gratuit' && (
                <Chip
                    label="GRATUIT!"
                    color="success"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontWeight: 'bold',
                        zIndex: 1, // Resmin altında kalmaması için
                        boxShadow: 2
                    }}
                />
            )}
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

                {event.distance && (
                    <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                        📍 Yurduna {event.distance} km uzaklıkta
                    </Typography>
                )}

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

                <Button
                    size="small"
                    color="secondary"
                    startIcon={<LocationOnIcon />}
                    href={getGoogleMapsUrl(event.lat, event.lon, event.address_name)}
                    target="_blank"
                >
                    Haritada Gör
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;