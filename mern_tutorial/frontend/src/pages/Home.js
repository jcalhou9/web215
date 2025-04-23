import {useEffect} from "react";
import {useWorkoutsContext} from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import API from '../utils/apiBaseUrl';

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`${API}/api/workouts`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    },
                });

                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: "SET_WORKOUTS", payload: json });
                } else {
                    console.error('Failed to fetch workouts:', json.error);
                }
            } catch (err) {
                console.error('Error contacting the server:', err.message);
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;