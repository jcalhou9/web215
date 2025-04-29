import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

function App() {
    const {user} = useContext(AuthContext);
    const [serverStatus, setServerStatus] = useState('waking');
    useEffect(() => {
        const attemptWakeServer = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000);

            try {
                await fetch(`${process.env.REACT_APP_API_URL}/api/ping`, {
                    method: 'GET',
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                return true;
            } catch (error) {
                clearTimeout(timeoutId);
                return false;
            }
        };
        const wakeServer = async () => {
            const firstTry = await attemptWakeServer();

            if (firstTry) {
                setServerStatus('ready');
            } else {
                console.log('First wake server attempt failed (expected). Retrying...');
                setServerStatus('retrying');

                const secondTry = await attemptWakeServer();

                if (secondTry) {
                    setServerStatus('ready');
                } else {
                    console.log('Second wake server attempt failed. Giving up.');
                    setServerStatus('failed');
                }
            }
        };
        wakeServer();
    }, []);

    if (serverStatus !== 'ready') {
        let message = '';
        if (serverStatus === 'waking') message = 'Waking up server...';
        else if (serverStatus === 'retrying') message = 'Retrying server...';
        else if (serverStatus === 'failed') message = 'Server failed, try again later.';
        return <Spinner message={message} />;
    }
    return (
        <div className="App">
            <Router>
                <Navbar />
                <div className="content-container">
                    <div className="pages">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
                            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;