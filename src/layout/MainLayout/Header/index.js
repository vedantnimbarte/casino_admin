import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2, IconUsers as AgentIcon, IconUser as PlayerIcon } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            <Box sx={{ ml: 4 }}>
                <Tooltip title="Create Player">
                    <IconButton
                        onClick={() => navigate('/player')}
                        color="secondary"
                        sx={{ '&:hover': { backgroundColor: theme.palette.secondary.light }, mr: 2 }}
                    >
                        <PlayerIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Create Agent">
                    <IconButton
                        onClick={() => navigate('/network/agents')}
                        color="secondary"
                        sx={{ '&:hover': { backgroundColor: theme.palette.secondary.light }, ml: 2 }}
                    >
                        <AgentIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
