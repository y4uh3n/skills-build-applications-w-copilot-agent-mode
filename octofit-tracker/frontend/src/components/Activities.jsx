import useApiCollection from '../hooks/useApiCollection';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/';

function Activities() {
  const { items: activities, loading, error } = useApiCollection(activitiesEndpoint);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Activities</h1>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">Error loading activities: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || activity.id}>
                <td>{activity.user}</td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Activities;
