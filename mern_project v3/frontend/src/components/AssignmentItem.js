import React from 'react';

const AssignmentItem = ({assignment, onEdit, onDelete, isEditing, editForm}) => {
    return (
        <li className="assignment-item">
            {isEditing ? (
                editForm
            ) : (
                <div className="assignment-content">
                    <div className="assignment-text">
                        <strong>{assignment.title}</strong>
                        <div className="assignment-meta">
                            <div>Status: {assignment.status}</div>
                            {assignment.dueDate && <div>Due: {assignment.dueDate}</div>}
                        </div>
                    </div>
                    <div className="assignment-buttons">
                        <button onClick={() => onEdit(assignment)}>Edit</button>
                        <button onClick={() => onDelete(assignment._id)}>Delete</button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default AssignmentItem;