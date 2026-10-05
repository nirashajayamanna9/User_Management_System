import { useNavigate } from "react-router-dom";

import { useState } from "react";


const Login = () => {
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const navigate=useNavigate();
    const handleLogin=()=>{
        if (email==='abc@gmail.com'&& password==='123') {
            navigate("/user-list");
        }
        else{
            alert("Invalid Email or Password");
        }
    }
    
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Login Page</h2>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text" 
                                    placeholder="Enter Your Email" 
                                    className="form-control" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Your Password" 
                                    className="form-control"   
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            

                            <button className="btn btn-primary w-100" onClick={handleLogin}>
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