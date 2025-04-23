import {useState} from 'react';
import {useAuthContext} from '../hooks/useAuthContext';
import API from '../utils/apiBaseUrl';

export const useLogin = () => {
    const [error, setError] =useState(null);
    const {dispatch} = useAuthContext();

    const login = async (username, password) => {
        setError(null);
        const response = await fetch(`${API}/api/userRoutes/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update the auth context
            dispatch({type: 'LOGIN', payload: json});
        }
    }
    return {login, error};
}