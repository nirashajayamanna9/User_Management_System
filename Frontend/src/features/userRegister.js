import React, { useState } from 'react'
import {useRegisterUserMutation} from '../service/userApi';
import { useNavigate } from 'react-router-dom';
import EmailInput from './emailInput';
import PasswordValidation from './passwordValidation';



function UserRegister() {

  const navigate=useNavigate();

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[role,setRole]= useState("");

  const [registerUser, { isLoading }] =
    useRegisterUserMutation();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        requestedRole: role,
      }).unwrap();

      alert(
        result?.message ||
        'Registration submitted! Please wait for admin approval.'
      );
      navigate('/');

      setName('');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (err) {
      const message = Array.isArray(err?.data?.message)
        ? err.data.message.join(', ')
        : err?.data?.message;

      alert(message || 'Registration failed. Please try again.');
    }
  };
    
  

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-5">
            <div className="card shadow">
              <div className="card-body p-4">
                  <h2 className="text-center mb-4">Create User New Account</h2>

                  <form onSubmit={handleSignup}>
                      <div>
                      <div className='mb-3'>
                        <label  className="form-label">Name</label>
                        <input type='text' placeholder='Enter Your Name' className="form-control" 
                        value={name} onChange={(e)=>setName(e.target.value)}/>
                      </div>
                      <EmailInput
                          email={email}
                          setEmail={setEmail}
                        />
                      <PasswordValidation
                        password={password}
                        setPassword={setPassword}/>
                      <div className='mb-3'>
                        <label  className="form-label">Role</label>
                        <select className="form-control"
                        value={role} onChange={(e)=>setRole(e.target.value)}>
                          <option value=" ">Role</option>
                          <option value="User">User</option>
                          <option value="Manager">Manager</option>
                        </select>
                      </div>
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Registering...' : 'Sign Up'}
                      </button>
                    </div>
                  </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegister