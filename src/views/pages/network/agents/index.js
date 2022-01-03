import { useState } from 'react';
import { Box, Tabs, Tab, Button, Paper } from '@mui/material';
import { IconCirclePlus as AddIcon } from '@tabler/icons';
import { useFormik } from 'formik';

import agentSchema from 'schema/agent.schema';

// __mock__ data
import playersList from './__mock__/player-list';
import approvalList from './__mock__/approval-list';

// Components
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'components/DataTable';
import NotFoundCard from 'components/NotFoundCard';
import Modal from 'components/Modal';

import NewAgentForm from './components/Forms/NewAgent';
import TabPanel from './components/TabPanel';

function Network() {
    const [openModal, setOpenModal] = useState(false);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            phone_no: '',
            agent_type: '',
            address: '',
            game_type_permissions: '',
            permissions: ''
        },
        validationSchema: agentSchema,
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
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="basic tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Agents List" />
                    <Tab label="Pending Approval" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <MainCard
                        title="Agents List"
                        secondary={
                            <Button startIcon={<AddIcon />} onClick={() => setOpenModal(!openModal)} variant="contained" color="secondary">
                                Add Agent
                            </Button>
                        }
                    >
                        <Box>
                            {playersList.length > 0 ? (
                                <DataTable title="Agents List" data={playersList} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MainCard title="Agents Approval List">
                        <Box>
                            {approvalList.length > 0 ? (
                                <DataTable title="Agents Approval List" data={approvalList} columns={columns} options={options} />
                            ) : (
                                <NotFoundCard msg="Sorry, No data found" />
                            )}
                        </Box>
                    </MainCard>
                </TabPanel>
            </Paper>

            <Modal title="Add New Agent" open={openModal} onClose={() => setOpenModal(!openModal)}>
                <NewAgentForm formik={formik} open={openModal} onClose={() => setOpenModal(!openModal)} />
            </Modal>
        </Box>
    );
}

export default Network;
