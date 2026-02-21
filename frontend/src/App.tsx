import { Box, Button, CircularProgress, Container, FormControlLabel, Switch, Typography } from '@mui/material';
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
    const [isFreeOnly, setIsFreeOnly] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ParisEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(0); // Kaçıncı sayfada olduğumuzu tutar
    const limit = 21;


    // Arama veya filtre değişince listeyi sıfırla
    useEffect(() => {
        setPage(0);
        loadEvents(0, true);
    }, [searchQuery, isFreeOnly]);

    const loadEvents = (currentOffset: number, isInitial: boolean) => {
        setLoading(true);
        fetchEvents(limit, searchQuery, isFreeOnly, currentOffset)
            .then(newData => {
                if (isInitial) {
                    setEvents(newData);
                } else {
                    setEvents(prev => [...prev, ...newData]); // Öncekilerin sonuna ekle
                }
                setLoading(false);
            });
    };

    const handleLoadMore = () => {
        const nextOffset = page + limit;
        setPage(nextOffset);
        loadEvents(nextOffset, false);
    };

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

                    {/* Ücretsiz Filtresi Switch'i */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isFreeOnly}
                                onChange={(e) => setIsFreeOnly(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Sadece Ücretsizler"
                    />
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

                {!loading && events.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleLoadMore}
                            sx={{ borderRadius: 4, px: 4 }}
                        >
                            Daha Fazla Etkinlik Yükle
                        </Button>
                    </Box>
                )}
            </Container>
            <EventDetailsModal event={selectedEvent} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Box>
    );
}

export default App;