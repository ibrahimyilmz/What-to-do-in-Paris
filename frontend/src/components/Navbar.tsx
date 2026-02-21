import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { AppBar, InputBase, Toolbar, Typography, alpha, styled } from '@mui/material';

// Arama kutusu için özel MUI stilleri
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: { width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)((({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: { width: '20ch', '&:focus': { width: '30ch' } },
    },
})));

interface NavbarProps {
    onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
    return (
        <AppBar position="sticky" sx={{ mb: 4, bgcolor: '#1A237E' }}>
            <Toolbar>
                <TravelExploreIcon sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} />
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '.1rem' }}>
                    PARIS LIVE
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Etkinlik ara..."
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </Search>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;