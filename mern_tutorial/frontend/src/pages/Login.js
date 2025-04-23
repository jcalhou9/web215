import {useState} from 'react';
import {useLogin} from '../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }
    
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;