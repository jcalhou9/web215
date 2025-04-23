import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import API from '../utils/apiBaseUrl';

export const useSignup = () => {
    const [error, setError] =useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (username, password) => {
        setError(null);
        const response = await fetch(`${API}/api/userRoutes/signup`, {
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
    return {signup, error};
}