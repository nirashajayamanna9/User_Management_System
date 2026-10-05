import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../service/temp";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id);

  const [
    updateUser,
    { isLoading: isUpdating, error: updateError },
  ] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setPassword("");
      setRole(user.role ?? "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      id: Number(id),
      name,
      email,
      role,
    };

    
    if (password.trim()) {
      updatedUser.password = password;
    }

    try {
      await updateUser(updatedUser).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (isLoading) {
    return <div className="container py-5">Loading user...</div>;
  }

  if (isError || !user) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          User not found or failed to load user.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-warning py-3">
              <h3 className="mb-0">Edit User</h3>
              <small>Update user account details</small>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Leave blank to keep current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Role
                  </label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                {updateError && (
                  <div className="alert alert-danger">
                    Update failed. Check the email and backend response.
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning flex-grow-1"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update User"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/user-list")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;