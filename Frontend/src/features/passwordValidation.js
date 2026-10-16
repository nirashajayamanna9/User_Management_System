import React, { useState } from 'react'

function PasswordValidation({password,setPassword,label='password'}) {
    const[showPassword]=useState(false);

        const getPasswordError = (value) => {
            if (!value) return "";
            if (value.length < 8) {
            return "Password must contain at least 8 characters.";
            }
            if (!/[A-Z]/.test(value)) {
            return "Include at least one capital letter.";
            }
            if (!/[a-z]/.test(value)) {
            return "Include at least one simple letter.";
            }
            if (!/[0-9]/.test(value)) {
            return "Include at least one number.";
            }
            if (!/[^A-Za-z0-9]/.test(value)) {
            return "Include at least one symbol (e.g. @ or #).";
            }
            return "";
        };
        const error = getPasswordError(password);

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          className={`form-control ${error ? "is-invalid" : password ? "is-valid" : ""}`}
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        
      </div>

      {error && (
        <div className="text-danger small mt-1">
          {error}
        </div>
      )}
    </div>
  )
}

export default PasswordValidation