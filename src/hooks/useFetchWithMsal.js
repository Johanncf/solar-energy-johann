import {
    useState,
    useCallback,
} from 'react';

import { useMsal } from "@azure/msal-react";
import { tokenRequest } from "../config/msalConfiguration";

/**
 * Custom hook to call a web API using bearer token obtained from MSAL
 */
const useFetchWithMsal = () => {
    const { instance } = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getMsalTokenRedirect = useCallback(async () => {
        const request = tokenRequest(instance);
    
        try {
            let tokenAcquisitionResult = await instance.acquireTokenSilent(request);
            return {
                accessToken: tokenAcquisitionResult.accessToken,
                msalError: null
            };
        } catch (error) {
            return {
                accessToken: null,
                msalError: error
            };
        }
    }, [instance]);

    /**
     * Execute a fetch request with the given options
     * @param {string} method: GET, POST, PUT, DELETE
     * @param {String} endpoint: The endpoint to call
     * @param {Object} data: The data to send to the endpoint, if any 
     * @returns JSON response
     */
    const execute = async (method, endpoint, data = null) => {
        const { accessToken, msalError } = await getMsalTokenRedirect();
        if (msalError) {
            setError(msalError);
            return;
        }

        if (accessToken) {
            try {
                let response = null;

                const headers = new Headers();
                const bearer = `Bearer ${accessToken}`;            
                headers.append("Authorization", bearer);

                if (data) headers.append('Content-Type', 'application/json');

                let options = {
                    method: method,
                    headers: headers,
                    body: data ? JSON.stringify(data) : null,
                };

                setIsLoading(true);

                response = await fetch(`https://localhost:7289/api/${endpoint}`, options);
                const apiData = await response.json();

                setData(apiData);
                setIsLoading(false);
                return apiData;
            } catch (e) {
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
    };

    return {
        isLoading,
        error,
        data,
        execute: useCallback(execute, [getMsalTokenRedirect]), // to avoid infinite calls when inside a `useEffect`
    };
};

export default useFetchWithMsal;