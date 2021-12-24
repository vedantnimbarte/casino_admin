import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    console.log(localStorage.getItem('user-authenticated') ? 'authenticated' : 'Login');
    // return useRoutes(localStorage.getItem('user-authenticated') ? [MainRoutes] : [AuthenticationRoutes]);
    return useRoutes([AuthenticationRoutes, MainRoutes]);
}
