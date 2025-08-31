import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#8B7FD1', // нежный пастельный фиолетовый
            light: '#B4A9E6',
            dark: '#6A5BAE',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FFB6B9', // мягкий розовый акцент
            light: '#FFD6D8',
            dark: '#D48A8D',
            contrastText: '#2E2E2E',
        },
        background: {
            default: 'rgba(245, 245, 255, 0.75)', // стеклянный фон
            paper: 'rgba(255, 255, 255, 0.6)', // карты с эффектом стекла
        },
        text: {
            primary: '#2E2E2E',
            secondary: '#5C5C5C',
        },
        divider: 'rgba(140, 130, 210, 0.2)',
    },
    typography: {
        fontFamily: `'SF Pro Display', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.5px',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '16px',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(20px)',
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(245,245,255,0.5))',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    borderRadius: '20px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                /* root: {
                 borderRadius: '20px',
                 padding: '8px 20px',
                 transition: 'all 0.3s ease',
                 boxShadow: '0 4px 12px rgba(139,127,209,0.2)',
                 '&:hover': {
                 boxShadow: '0 6px 16px rgba(139,127,209,0.3)',
                 },
                 }, */
                root: {
                    fontWeight: 600,
                    textTransform: 'none',
                },
                contained: {
                    backgroundColor: '#2d3748',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#1d2836',
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderColor: '#2d3748',
                    color: '#2d3748',
                    '&:hover': {
                        borderColor: '#1d2836',
                        backgroundColor: 'rgba(45, 55, 72, 0.04)',
                        color: '#1d2836',
                    },
                },
                text: {
                    color: '#2d3748',
                    '&:hover': {
                        color: '#1d2836',
                        backgroundColor: 'rgba(45, 55, 72, 0.04)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(25px)',
                    background: 'rgba(255,255,255,0.6)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '24px',
                    backdropFilter: 'blur(16px)',
                    background: 'rgba(255,255,255,0.55)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                },
            },
        },
    },
});

export default theme;
