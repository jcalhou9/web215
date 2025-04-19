import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import API from '../utils/apiBaseUrl';

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const fetchWorkouts = async () => {
            try {
                const response = await fetch(`${API}/api/workouts`);
                console.log(`${API}/api/workouts`);
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: "SET_WORKOUTS", payload: json });
                }
            } catch (error) {
                console.error("Error fetching workouts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkouts();
    }, [dispatch]);
    return (
        <div className="home">
            {loading ? (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Waking up server...</p>
                </div>
            ) : (
                <>
                    <div className="workouts">
                        {workouts && workouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                        ))}
                    </div>
                    <WorkoutForm />
                </>
            )}
        </div>
    );
};

export default Home;