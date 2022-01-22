import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, IconButton, Chip } from '@mui/material';
import {
    IconDiamond as DiamondsIcon,
    IconCoin as CoinIcon,
    IconCurrencyDollar as AmountIcon,
    IconAward,
    IconPencil as EditIcon,
    IconTrash as DeleteIcon
} from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme, data }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: data.ISOFFER && theme.palette.warning.light,
    height: '100%',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, handleEdit, data, dataIndex, handleDelete }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper data={data} elevation={4}>
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {data.ISOFFER ? (
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <IconAward color={theme.palette.warning.dark} size="2rem" />{' '}
                                <Chip label={data.DISCOUNT + '% discount'} color="warning" />
                            </Box>
                        ) : (
                            <Box size="2rem" />
                        )}
                        <Box style={{ display: 'flex' }}>
                            <IconButton onClick={() => handleEdit(dataIndex)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(data.PACK_ID)}>
                                <DeleteIcon color="red" />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Box
                                    style={{
                                        border: '1px solid',
                                        borderRadius: 5,
                                        borderColor: theme.palette.warning.dark,
                                        textAlign: 'center',
                                        marginBottom: 40,
                                        padding: 2
                                    }}
                                >
                                    <Typography
                                        style={{
                                            fontSize: '3rem',
                                            fontWeight: 500
                                        }}
                                        id="game-pack-title"
                                    >
                                        {data.PACK_NAME}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CoinIcon />
                                    <Typography
                                        sx={{
                                            fontSize: '2.5rem',
                                            fontWeight: 500,
                                            ml: 2
                                        }}
                                    >
                                        {data.MAGESTIC_COINS}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item direction="row">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <DiamondsIcon />
                                    <Typography
                                        sx={{
                                            fontSize: '2.5rem',
                                            fontWeight: 500,
                                            ml: 2
                                        }}
                                    >
                                        {data.MAGESTIC_POINTS}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item direction="row">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AmountIcon />
                                    <Typography
                                        sx={{
                                            fontSize: '2.5rem',
                                            fontWeight: 500,
                                            ml: 2
                                        }}
                                    >
                                        {data.BUY_AMOUNT}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
