import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Button } from '@mui/material';
import { IconCurrencyDollar as TransactionIcon } from '@tabler/icons';
import { useFormik } from 'formik';

import playerSchema from 'schema/player.schema';

// __mock__ data
import playersList from './__mock__/player-list';
import approvalList from './__mock__/approval-list';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import FullScreenDialog from 'components/FullScreenDialog';

import PlayerDeposit from './components/Forms/player/PlayerDepositForm';
import PlayerWithdraw from './components/Forms/player/PlayerWithdrawForm';
import TabPanel from './components/TabPanel';

function Transaction() {
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = React.useState(0);
    const [transaction, setTransaction] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formik = useFormik({
        initialValues: { username: '', name: '', email: '', password: '', confirm_password: '', phone_no: '', agent: '' },
        validationSchema: playerSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const columns = ['ID', 'username', 'name', 'email', 'phone_no', 'agent', 'status'];

    const options = {
        filter: false,
        print: false,
        download: false,
        selectableRows: false,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20],
        jumpToPage: true,
        elevation: 2
    };

    return (
        <Box>
            <Paper>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                    <Tab label="Player Transaction" />
                    <Tab label="Agent Transaction" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <MainCard
                        title="Players Transactions"
                        secondary={
                            <Box>
                                <Button startIcon={<TransactionIcon />} variant="contained" color="warning" sx={{ mr: 3 }}>
                                    Deposit
                                </Button>
                                <Button startIcon={<TransactionIcon />} variant="contained" color="warning" sx={{ ml: 3 }}>
                                    Withdraw
                                </Button>
                            </Box>
                        }
                    >
                        <Box>
                            {playersList.length > 0 ? (
                                <DataTable title="Players Transaction List" data={playersList} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MainCard
                        title="Agents Transactions"
                        secondary={
                            <Box>
                                <Button startIcon={<TransactionIcon />} variant="contained" color="warning" sx={{ mr: 3 }}>
                                    Deposit
                                </Button>
                                <Button startIcon={<TransactionIcon />} variant="contained" color="warning" sx={{ ml: 3 }}>
                                    Withdraw
                                </Button>
                            </Box>
                        }
                    >
                        <Box>
                            {approvalList.length > 0 ? (
                                <DataTable title="Agents Transactions List" data={approvalList} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
            </Paper>

            <FullScreenDialog
                title={transaction === 0 ? 'Deposit' : 'Withdraw'}
                dialogStatus={openModal}
                setDialogStatus={setOpenModal}
                formik={formik}
            >
                {transaction === 0 && <PlayerDeposit formik={formik} />}
                {transaction === 1 && <PlayerWithdraw formik={formik} />}
            </FullScreenDialog>
        </Box>
    );
}

export default Transaction;
