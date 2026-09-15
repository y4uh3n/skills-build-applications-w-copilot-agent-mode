import useApiCollection from '../hooks/useApiCollection';

function Leaderboard() {
  const { items: entries, loading, error } = useApiCollection('leaderboard');

  return (
    <div className="container py-4">
      <h1 className="mb-4">Leaderboard</h1>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">Error loading leaderboard: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id || entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
