import useApiCollection from '../hooks/useApiCollection';

function Users() {
  const { items: users, loading, error } = useApiCollection('/api/users/');

  return (
    <div className="container py-4">
      <h1 className="mb-4">Users</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">Error loading users: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
