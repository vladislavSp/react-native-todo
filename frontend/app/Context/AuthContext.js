import { createContext, useEffect } from 'react';
import request, { METHODS } from '../utils/request';
import useStateCallback from '../hooks/useStateCallback';
import { deletePrivateKey, getData, removeDataItem, savePrivateKey, storeData } from '../utils/storeUtils';
import { STRINGS } from '../constants/constants';

const AUTH_PATHS = {
    register: 'http://192.168.0.159:3500/register',
    auth: 'http://192.168.0.159:3500/auth',
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useStateCallback(null);
    const [isInitialLoading, setInitialLoading] = useStateCallback(true);

    useEffect(() => { // load storageData on start
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const authDataSerialized = getData(STRINGS.userData);

            if (authDataSerialized) setAuthData(authDataSerialized);
        } catch (error) {
            console.log(error);
        } finally {
            setInitialLoading(false);
        }
    }

    const register = async (regData, cbSuccess, cbError) => {
        const body = { user: regData.name, email: regData.email, password: regData.pwd };
        const _regData = await request(AUTH_PATHS.register, {
            method: METHODS.POST,
            body: JSON.stringify(body),
        });

        const { data, status, error } = _regData;

        if (status < 400) {
            // показывать успешной рег-ции, next step - change auth on true
            // + получить объект юзера - вернуть его из бэка и сохранить токен на клиенте
            cbSuccess(true); // view screen success reg

            storeData(data.user, STRINGS.userData);
            savePrivateKey(STRINGS.accessToken, data.accessToken);
            setTimeout(() => setAuthData(data), 1500);
        } else {
            cbError(prev => ({
                ...prev,
                general: error.message,
            }))
        }
    };

    const signIn = async (authData, cbSuccess, cbError) => {
        const body = { email: authData.email, password: authData.pwd };

        const _authData = await request(AUTH_PATHS.auth, {
            method: METHODS.POST,
            body: JSON.stringify(body),
        });

        const { data, status, error } = _authData;

        if (status && status < 400) {
            storeData(data.user, STRINGS.userData);
            savePrivateKey(STRINGS.accessToken, data.accessToken);
            setAuthData(data);
        } else {
            console.log(data, status, error);
            cbError(error.message);
        }
    }

    const signOut = async () => {
        setAuthData(null);
        removeDataItem(STRINGS.userData);
        deletePrivateKey(STRINGS.accessToken);
    };

    return (
        <AuthContext.Provider value={{ authData, isInitialLoading, signIn, signOut, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
