import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import CMSRoutes from './CMSRoutes';
import ConfigurationRoutes from './ConfigurationRoutes';
import NetworkRoutes from './NetworkRoutes';
import ErrorRoutes from './ErrorRoutes';

import { useSelector } from 'react-redux';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const user = useSelector((state) => state.user);

    MainRoutes.children.map((route, index) => {
        if (!user.allowedRoutes.includes(route.path)) {
            MainRoutes.children.splice(index, 1);
        }
        return route;
    });

    // return useRoutes(localStorage.getItem('user-authenticated') ? [MainRoutes] : [AuthenticationRoutes]);
    return useRoutes([AuthenticationRoutes, MainRoutes, NetworkRoutes, CMSRoutes, ConfigurationRoutes, ErrorRoutes]);
}
