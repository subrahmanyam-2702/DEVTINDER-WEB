import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [emailId, setEmailId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.patch(BASE_URL+"/profile/forgotpassword", {
        emailId,
        newPassword,
      },{withCredentials:true});
      setMessage(res.data);
      return navigate("/login");
    } catch (err) {
      setMessage(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-base-content mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-base-content/80">{message}</p>
        )}
      </div>
    </div>
  );
}
