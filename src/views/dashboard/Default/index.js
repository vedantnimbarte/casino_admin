import React, { useEffect, useState } from 'react';

// material-ui
import { FormControl, Grid, InputLabel, MenuItem, Select, Box, TextField, Card } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// project imports
import TotalPlayersCard from './TotalPlayersCard';
import PopularGamesCard from './PopularGamesCard';
import TotalNetworkCard from './TotalNetworkCard';
import TotalIncomeCard from './TotalIncomeCard';
import MyProfitCard from './MyProfitCard';
import TopAgentsCard from './TopAgentsCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    const [value, setValue] = useState([null, null]);
    console.log(value);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalPlayersCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalNetworkCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <MyProfitCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth style={{ marginBottom: 5 }}>
                            <InputLabel>Select Agent</InputLabel>
                            <Select>
                                <MenuItem>All</MenuItem>
                                <MenuItem>Master Distributor</MenuItem>
                                <MenuItem>Distributor</MenuItem>
                                <MenuItem>Sub Distributor</MenuItem>
                                <MenuItem>Stores</MenuItem>
                            </Select>
                        </FormControl>
                        <TopAgentsCard isLoading={isLoading} />
                    </Grid>

                    <Grid item xs={12} md={4} direction="column" alignItems="center" justifyContent="center">
                        <FormControl fullWidth style={{ marginBottom: 20 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateRangePicker
                                    startText="Start Date"
                                    fullWidth
                                    endText="End Date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <>
                                            <TextField {...startProps} fullWidth />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} fullWidth />
                                        </>
                                    )}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={6} item>
                                <TotalIncomeCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <MyProfitCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <MyProfitCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <TotalIncomeCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <TotalIncomeCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <MyProfitCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth style={{ marginBottom: 5 }}>
                            <InputLabel>Select Game</InputLabel>
                            <Select>
                                <MenuItem>All</MenuItem>
                                <MenuItem>Fish</MenuItem>
                                <MenuItem>Slot</MenuItem>
                                <MenuItem>Table</MenuItem>
                            </Select>
                        </FormControl>
                        <PopularGamesCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
