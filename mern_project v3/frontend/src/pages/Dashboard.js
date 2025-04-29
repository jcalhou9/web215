import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useAssignments} from '../hooks/useAssignments';
import AddForm from '../components/AddForm';
import EditForm from '../components/EditForm';
import AssignmentItem from '../components/AssignmentItem';
import Spinner from '../components/Spinner';

//dashboard page
const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const {assignments, setAssignments, loading, error, setError, deleteAssignment} = useAssignments(user);

    //add form state
    const [addTitle, setAddTitle] = useState('');
    const [addStatus, setAddStatus] = useState('Not Started');
    const [addDueDate, setAddDueDate] = useState('');

    //edit form state
    const [editTitle, setEditTitle] = useState('');
    const [editStatus, setEditStatus] = useState('Not Started');
    const [editDueDate, setEditDueDate] = useState('');
    const [editingId, setEditingId] = useState(null);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!addTitle.trim()) {
            setError('Title is required.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({title: addTitle, status: addStatus, dueDate: addDueDate})
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Failed to save assignment.');
            } else {
                setAssignments([json, ...assignments]);
                setAddTitle('');
                setAddStatus('Not Started');
                setAddDueDate('');
            }
        } catch (err) {
            console.error('Add assignment failed', err);
            setError('Server error. Try again later.');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!editTitle.trim()) {
            setError('Title is required.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/${editingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({title: editTitle, status: editStatus, dueDate: editDueDate})
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Failed to update assignment.');
            } else {
                setAssignments(assignments.map(a => a._id === editingId ? json : a));
                setEditingId(null);
                setEditTitle('');
                setEditStatus('Not Started');
                setEditDueDate('');
            }
        } catch (err) {
            console.error('Edit assignment failed', err);
            setError('Server error. Try again later.');
        }
    };

    const handleEdit = (assignment) => {
        setEditingId(assignment._id);
        setEditTitle(assignment.title);
        setEditStatus(assignment.status);
        setEditDueDate(assignment.dueDate || '');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle('');
        setEditStatus('Not Started');
        setEditDueDate('');
    };

    if (loading) {
        return <Spinner message="Loading assignments..." />;
    }

    return (
        <div className="dashboard">
            <h2>Add New Assignment</h2>
            {error && <div className="error">{error}</div>}

            <AddForm
                title={addTitle}
                status={addStatus}
                dueDate={addDueDate}
                setTitle={setAddTitle}
                setStatus={setAddStatus}
                setDueDate={setAddDueDate}
                handleSubmit={handleAddSubmit}
            />

            <h3>Your Assignments</h3>
            {assignments.length === 0 ? (
                <p>No assignments yet.</p>
            ) : (
                <ul>
                    {assignments.map((assignment) => (
                        <AssignmentItem
                            key={assignment._id}
                            assignment={assignment}
                            onEdit={handleEdit}
                            onDelete={deleteAssignment}
                            isEditing={editingId === assignment._id}
                            editForm={
                                editingId === assignment._id && (
                                    <EditForm
                                        title={editTitle}
                                        status={editStatus}
                                        dueDate={editDueDate}
                                        setTitle={setEditTitle}
                                        setStatus={setEditStatus}
                                        setDueDate={setEditDueDate}
                                        handleSubmit={handleEditSubmit}
                                        cancelEdit={cancelEdit}
                                    />
                                )
                            }
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;