import useApiCollection from '../hooks/useApiCollection';

function Teams() {
  const { items: teams, loading, error } = useApiCollection('teams');

  return (
    <div className="container py-4">
      <h1 className="mb-4">Teams</h1>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">Error loading teams: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id || team.id}>
                <td>{team.name}</td>
                <td>
                  {Array.isArray(team.members)
                    ? team.members.length
                    : team.members}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teams;
