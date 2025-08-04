"use client";

import { useCompaniesQuery } from '@/entities/company/lib/use-companies-query';
import { Card, CardContent, Typography, Box, CircularProgress, TextField } from '@mui/material';
import styles from './company-list.module.css';
import { useState } from 'react';

export function CompanyList() {
    const { data: companies, isLoading, error } = useCompaniesQuery();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCompanies = companies?.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <Box className={styles.loadingContainer}>
                <CircularProgress size={40} />
                <Typography variant="body1" className={styles.loadingText}>
                    Loading companies...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return <Typography color="error" className={styles.errorText}>Ошибка загрузки данных</Typography>;
    }

    return (
        <Box>
            <Box style={{display: 'flex', flexDirection:  'column', alignItems: 'center'}}>
            <TextField
                label="Search companies..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                fullWidth
                margin="normal"
            />
            </Box>
            <Box className={styles.companyList}>
                {filteredCompanies?.map((company) => (
                    <Card key={company.id} className={styles.card}>
                        <CardContent>
                            <Box className={styles.companyHeader}>
                                <Typography variant="h6" className={styles.cardTitle}>
                                    {company.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className={styles.location}>
                                    {company.description.split('.')[0]} {/* Имитация локации */}
                                </Typography>
                            </Box>
                            <Box className={styles.tags}>
                                <Typography variant="caption" className={styles.tag}>
                                    tech
                                </Typography>
                                <Typography variant="caption" className={styles.tag}>
                                    remote
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}