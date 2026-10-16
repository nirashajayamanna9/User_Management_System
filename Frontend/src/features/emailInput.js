
import React from "react";

function EmailInput({ email, setEmail }) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let error = "";

  if (email.length > 0 && !emailPattern.test(email)) {
    error = "Please enter a valid email address.";
  }

  return (
    <div className="mb-3">
      <label className="form-label">Email</label>

      <input
        type="email"
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}

export default EmailInput;
