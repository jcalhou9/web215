import React from 'react';

const AddForm = ({title, status, dueDate, setTitle, setStatus, setDueDate, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className="assignment-form">
            <input
                type="text"
                placeholder="Assignment Title"
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
            <button type="submit">Add Assignment</button>
        </form>
    );
};

export default AddForm;