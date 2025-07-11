import {useState} from 'react';
import {useWorkoutsContext} from '../hooks/useWorkoutsContext';
import {useAuthContext} from '../hooks/useAuthContext';
import API from '../utils/apiBaseUrl';

const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedWorkout, setUpdatedWorkout] = useState({
    title: workout.title,
    load: workout.load,
    reps: workout.reps,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const response = await fetch(`${API}/api/workouts/${workout._id}`, 
        {method: 'PATCH', body: JSON.stringify(updatedWorkout), headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}}
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`${API}/api/workouts/${workout._id}`, {method: 'DELETE', headers:{'Authorization': `Bearer ${user.token}`}});
    const json = await response.json();
    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json});
    }
  };
  return (
    <div className="workout-details">
      {isEditing ? (
        <form className="update-form" onSubmit={handleUpdate}>
          <label>Title:</label>
          <input type="text" value={updatedWorkout.title} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, title: e.target.value })}/>
          <label>Weight (lbs):</label>
          <input type="number" value={updatedWorkout.load} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, load: e.target.value })}/>
          <label>Reps:</label>
          <input type="number" value={updatedWorkout.reps} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, reps: e.target.value })}/>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}> Cancel</button>
        </form>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Weight (lbs): </strong> {workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <span id='edit' className="material-symbols-outlined" onClick={() => setIsEditing(true)}>edit</span>
          <span id='delete' className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;