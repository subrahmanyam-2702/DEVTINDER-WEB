import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login=()=>
{
    const [emailId,setEmailId]=useState("sahiti@gmail.com");
    const [password,setPassword]=useState("Sahiti@123");
    const [error,setError]=useState("");
   const dispatch=useDispatch();
   const navigate=useNavigate();
    const handleLogin=async ()=>
    {
        try
        {
            const res=await axios.post(
                BASE_URL+"/login",
                {
                    emailId,
                    password
                },{withCredentials:true});
        dispatch(addUser(res.data.user));
        const profileRes = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
        });
      dispatch(addUser(profileRes.data));
        return navigate("/");
        }
        catch(err)
        {
            setError(err?.response?.data || "Something went wrong");
            console.error(err);
        }
    }
    return (
        <div className="flex justify-center my-15">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">LOGIN</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Email</legend>
                        <input 
                             type="text" 
                             className="input" 
                             placeholder="Enter Email Id" 
                             value={emailId}
                             onChange={(e)=>setEmailId(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">Password</legend>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Enter the Password" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </fieldset>
                     <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-end my-2">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;