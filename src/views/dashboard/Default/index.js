import { useEffect, useState } from 'react';

// material-ui
import { FormControl, Grid, InputLabel, MenuItem, Select, Box, TextField } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// project imports
import TotalPlayersCard from './components/cards/TotalPlayersCard';
import PopularGamesCard from './components/cards/PopularGamesCard';
import TotalNetworkCard from './components/cards/TotalNetworkCard';
import TotalIncomeCard from './components/cards/TotalIncomeCard';
import MyProfitCard from './components/cards/MyProfitCard';
import TopAgentsCard from './components/cards/TopAgentsCard';
import TotalBetsCard from './components/cards/TotalBetsCard';
import TotalDepositCard from './components/cards/TotalDepositCard';
import TotalWinsCard from './components/cards/TotalWinsCard';
import TotalWIthdrawCard from './components/cards/TotalWIthdrawCard';
import NetRevenueCard from './components/cards/NetRevenueCard';
import MaxWinCard from './components/cards/MaxWinCard';
import { gridSpacing } from 'store/constant';
import TotalActivePlayers from './components/cards/TotalActivePlayers';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    const [value, setValue] = useState([null, null]);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TotalPlayersCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TotalNetworkCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TotalActivePlayers isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={3} md={12} sm={12} xs={12}>
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
                            <Select label="Select Agent">
                                <MenuItem>All</MenuItem>
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
                                <TotalDepositCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <TotalBetsCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <TotalWIthdrawCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <TotalWinsCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <NetRevenueCard isLoading={isLoading} />
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <MaxWinCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth style={{ marginBottom: 5 }}>
                            <InputLabel>Select Game Type</InputLabel>
                            <Select label="Select Game Type">
                                <MenuItem>All</MenuItem>
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
