import {Link} from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext';

const Navbar = () => {
    const {user, logout} = useAuthContext();
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Assignment Manager</h1>
                </Link>
                <nav>
                    {user ? (
                        <div className="user-info">
                            <span className="username">{user.username}</span>
                            <Link className="auth-button" to="/dashboard">Dashboard</Link>
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link className="auth-button" to="/login">Login</Link>
                            <Link className="auth-button" to="/register">Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;