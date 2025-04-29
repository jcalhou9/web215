import React from 'react';

const EditForm = ({title, status, dueDate, setTitle, setStatus, setDueDate, handleSubmit, cancelEdit}) => {
    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <div className="form-row">
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                </select>
                <input
                    type="text"
                    placeholder="Due Date (optional)"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <div style={{display: 'flex', gap: '1ch'}}>
                <button type="submit">Update</button>
                <button
                    type="button"
                    onClick={cancelEdit}
                    style={{backgroundColor: 'gray'}}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditForm;