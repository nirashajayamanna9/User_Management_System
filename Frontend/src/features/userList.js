import { useNavigate } from 'react-router-dom';

import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../service/temp';

const UserList = () => {
  const navigate = useNavigate();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useGetUsersQuery();

  const [deleteUser, { isLoading: isDeleting }] =
    useDeleteUserMutation();

  async function handleDelete(id) {
    if (!window.confirm('Delete this user?')) return;

    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      alert(
        err?.data?.message || 'Failed to delete user',
      );
    }
  }

  if (isLoading) return <p>Loading users...</p>;

  if (isError) {
    return (
      <p>
        Failed to load users. Check backend and CORS.
        {' '}
        {error?.status || ''}
      </p>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>User Management System</h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-user')}
        >
          + Add User
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5>All Users</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() =>
                          navigate(`/edit-user/${user.id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        disabled={isDeleting}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;