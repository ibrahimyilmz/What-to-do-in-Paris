import { Box, CircularProgress, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import EventCard from './components/EventCard';
import EventDetailsModal from './components/EventDetailsModal';
import Navbar from './components/Navbar';
import { fetchEvents } from './services/api';
import type { ParisEvent } from './types/event';

function App() {
    const [events, setEvents] = useState<ParisEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<ParisEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchEvents(21, searchQuery)
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [searchQuery]);

    const handleOpenModal = (event: ParisEvent) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <Box sx={{ bgcolor: '#F4F6F8', minHeight: '100vh' }}>
            <Navbar onSearch={(q) => setSearchQuery(q)} />
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Paris Etkinlik Rehberi
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>
                ) : (
                    <Grid container spacing={4}>
                        {events.map(event => (
                            <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <EventCard
                                    event={event}
                                    onDetailClick={() => handleOpenModal(event)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
            <EventDetailsModal event={selectedEvent} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Box>
    );
}

export default App;