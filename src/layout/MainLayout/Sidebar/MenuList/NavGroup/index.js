import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, MenuItem, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const menuItemList = item;
    menuItemList.children?.map((menuItem, index) => {
        switch (menuItem.type) {
            case 'item':
                if (!user.allowedRoutes.includes(menuItem.url)) {
                    menuItemList.children.splice(index, 1);
                }
                return menuItem;
            case 'collapse':
                menuItem.children?.map((collapseMenuItem, idx) => {
                    if (!user.allowedRoutes.includes(collapseMenuItem.url)) {
                        menuItemList.children[index].children?.splice(idx, 1);
                    }
                    return collapseMenuItem;
                });
                return menuItem;
            default:
                return menuItem;
        }
    });

    const items = menuItemList.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
