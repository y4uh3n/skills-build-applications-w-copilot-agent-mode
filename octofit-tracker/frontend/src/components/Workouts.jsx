import useApiCollection from '../hooks/useApiCollection';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/';

function Workouts() {
  const { items: workouts, loading, error } = useApiCollection(workoutsEndpoint);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Workouts</h1>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">Error loading workouts: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id || workout.id}>
                <td>{workout.name}</td>
                <td>{workout.description}</td>
                <td>{workout.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Workouts;
