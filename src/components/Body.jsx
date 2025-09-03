import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import Footer from "./Footer";
import { VITE_BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";

const Body=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user= useSelector((store)=> store.user);
    const fetchUSer=async()=>
    {

       if(user) return;   
       try{
            const res=await axios.get(import.meta.env.VITE_BASE_URL+"/profile/view",{
                withCredentials: true
            });
            dispatch(addUser(res.data));
       }
       catch(err)
       {
        if(err.status===401)
        {
            navigate("/login");
        }
        console.error(err);
       }
    };
    useEffect(()=>{
        fetchUSer();
    },[]);
    return (
        <div className="bg-base-100">
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Body;