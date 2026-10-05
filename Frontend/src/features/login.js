import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../service/authApi";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const handleLogin = async () => {

  

  try {

    const result = await login({
      email: email,
      password: password,
    }).unwrap();

    

    if (result.message === "Login Successful") {
      navigate("/user-list");
    }

  } catch (error) {

    console.log("Login Error:", error);

    alert("Invalid Email or Password");
  }
};

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Login Page
              </h2>

              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

              <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;