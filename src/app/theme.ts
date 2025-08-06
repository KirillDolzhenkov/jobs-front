import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3748',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#2d3748',
                        },
                        '&:hover fieldset': {
                            borderColor: '#1d2836',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1d2836',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#2d3748',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1d2836',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
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
    },

});

export default theme;