import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';

const AppNavigation = () => {
    const [auth] = useContext(AppContext);

    return (
        !auth ? <AuthNavigation /> : <TabNavigation />
    )
};

export default AppNavigation;
