import React, { useState, useEffect } from 'react';
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
import Modal from 'components/Modal';
import PlayerDeposit from './components/Forms/player/PlayerDepositForm';
import PlayerWithdraw from './components/Forms/player/PlayerWithdrawForm';
import AgentDeposit from './components/Forms/agent/AgentDepositForm';
import TabPanel from './components/TabPanel';

function Transaction() {
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = React.useState(0);
    const [deposit, setDeposit] = useState(false);
    const [withdraw, setWithdraw] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

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

    function getTitle() {
        if (value === 0 && deposit) {
            setModalTitle('Player Deposit');
        }
        if (value === 0 && withdraw) {
            setModalTitle('Player Withdraw');
        }
        if (value === 1) {
            setModalTitle('Agent Deposit');
        }
    }

    useEffect(() => {
        getTitle();
        return () => {
            setModalTitle('');
        };
    }, [withdraw, deposit, value]);

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

    const handlePlayerTransactionModal = (type) => {
        if (type === 'deposit') {
            setDeposit(!deposit);
            setWithdraw(false);
        }
        if (type === 'withdraw') {
            setWithdraw(!withdraw);
            setDeposit(false);
        }

        setOpenModal(!openModal);
    };

    const handleAgentTransactionModal = (type) => {
        if (type === 'deposit') {
            setDeposit(!deposit);
        }
        if (type === 'withdraw') {
            setWithdraw(!withdraw);
        }
        setOpenModal(!openModal);
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
                                <Button
                                    startIcon={<TransactionIcon />}
                                    variant="contained"
                                    color="warning"
                                    sx={{ mr: 3 }}
                                    onClick={() => handlePlayerTransactionModal('deposit')}
                                >
                                    Deposit
                                </Button>
                                <Button
                                    startIcon={<TransactionIcon />}
                                    variant="contained"
                                    color="warning"
                                    sx={{ ml: 3 }}
                                    onClick={() => handlePlayerTransactionModal('withdraw')}
                                >
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
                            <Button
                                startIcon={<TransactionIcon />}
                                variant="contained"
                                color="warning"
                                sx={{ mr: 3 }}
                                onClick={() => setOpenModal(!openModal)}
                            >
                                Deposit
                            </Button>
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

            <Modal title={modalTitle} open={openModal} onClose={() => setOpenModal(!openModal)}>
                {value === 0 && deposit && (
                    <PlayerDeposit formik={formik} openModal={openModal} setOpenModal={() => handlePlayerTransactionModal('deposit')} />
                )}
                {value === 0 && withdraw && (
                    <PlayerWithdraw formik={formik} openModal={openModal} setOpenModal={() => handlePlayerTransactionModal('withdraw')} />
                )}
                {value === 1 && <AgentDeposit formik={formik} openModal={openModal} setOpenModal={setOpenModal} />}
            </Modal>
        </Box>
    );
}

export default Transaction;
