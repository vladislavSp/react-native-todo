import { createContext } from 'react';
// import useStateCallback from '../hooks/useStateCallback';

const AppContext = createContext();

export const AppProvider = ({ children, auth, setAuth }) => {
    return (
        <AppContext.Provider value={[auth, setAuth]}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
