import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { VITE_BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      setError("");
      setSuccess("");

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      const loginRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(loginRes.data.user));
      const profileRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(profileRes.data));

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/profile"), 1000);

    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-lg">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">SIGN UP</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input"
              placeholder="Enter Email Id"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div className="card-actions flex-col gap-2 mt-4">
            <button className="btn btn-primary w-full" onClick={handleSignup}>
              Sign Up
            </button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
