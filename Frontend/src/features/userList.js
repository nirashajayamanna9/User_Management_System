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

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <p>Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Failed to load users. Check backend and CORS.
          {' '}
          {error?.status || ''}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h1 className="mb-1">
            User Management System
          </h1>

          <p className="text-muted mb-0">
            Manage all system users
          </p>
        </div>

        <div className="d-flex gap-2">

          <button
            className="btn btn-primary"
            onClick={() => navigate('/add-user')}
          >
            <i className="bi bi-person-plus me-2"></i>
            Add User
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>

        </div>
      </div>

      {/* User Table */}
      <div className="card shadow-sm border-0">

        <div className="card-header bg-white py-3">
          <h5 className="mb-0">
            All Users
          </h5>
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
                  <td
                    colSpan="5"
                    className="text-center py-4"
                  >
                    No users found
                  </td>
                </tr>

              ) : (

                users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>
                      <strong>{user.name}</strong>
                    </td>

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
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        disabled={isDeleting}
                        onClick={() =>
                          handleDelete(user.id)
                        }
                      >
                        <i className="bi bi-trash me-1"></i>
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