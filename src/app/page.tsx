import { CompanyList } from '@/entities/company/ui/company-list';
import { Typography, Box, Button } from '@mui/material';
import styles from './page.module.css';

export default function HomePage() {
    return (
        <main className={styles.main}>
            <Box className={styles.header}>
                <Typography variant="h3" component="h1" className={styles.title}>
                    Remote Tech Companies
                </Typography>
                <Typography variant="body1" className={styles.subtitle}>
                    Discover top-tier remote tech companies from leading industries worldwide.
                </Typography>
                <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={styles.postJobButton}
                    >
                        Post a job
                    </Button>
                </Box>
            </Box>
            <CompanyList />
        </main>
    );
}