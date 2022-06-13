import { createContext } from 'react';
import useStateCallback from '../hooks/useStateCallback';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [auth, setAuth] = useStateCallback(false);

    return (
        <AppContext.Provider value={[auth, setAuth]}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
