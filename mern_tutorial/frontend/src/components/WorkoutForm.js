import {useState} from 'react'
import {useWorkoutsContext} from "../hooks/useWorkoutsContext";
import API from '../utils/apiBaseUrl';
import {useAuthContext} from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const HandleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, load, reps }

        const response = await fetch(`${API}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('New workout added:', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={HandleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Weight (lbs):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm