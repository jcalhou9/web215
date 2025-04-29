import {useState, useEffect} from 'react';

export const useAssignments = (user) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchAssignments = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments`, {
                headers: {Authorization: `Bearer ${user.token}`}
            });
            const json = await response.json();

            if (response.ok) {
                setAssignments(json);
            } else {
                setError(json.error || 'Failed to fetch assignments.');
            }
        } catch (err) {
            console.error('Fetch assignments failed', err);
            setError('Server error. Try again later.');
        } finally {
            setLoading(false);
        }
    };
    const deleteAssignment = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/${id}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${user.token}`}
            });
            if (!response.ok) {
                const json = await response.json();
                setError(json.error || 'Failed to delete assignment.');
            } else {
                setAssignments(assignments.filter(a => a._id !== id));
            }
        } catch (err) {
            console.error('Delete assignment failed', err);
            setError('Server error. Try again later.');
        }
    };
    useEffect(() => {
        fetchAssignments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {assignments, setAssignments, loading, error, setError, fetchAssignments, deleteAssignment};
};