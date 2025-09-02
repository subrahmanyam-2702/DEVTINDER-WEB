import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections=()=>
{
    const connections=useSelector((store)=>store.connections);
    const dispatch=useDispatch();
    const fetchconnections=async ()=>
    {
        try{
           const res=await axios.get(BASE_URL+"/user/connections",{
            withCredentials:true
        });
        dispatch(addConnections(res.data.data));
        console.log(res.data.data);
        }catch(err)
        {
            console.error("Failed to load the connections");
        }
    }
    useEffect(()=>{
        fetchconnections();
    },[]);
    if(!connections) return;
    if(connections.length===0) return <h1 className="font-bold text-2xl">No Connections found</h1>
  return (
  <div className="bg-base-100 min-h-screen pb-24 pt-10">
    <div className="flex justify-center mb-8">
      <h1 className="text-2xl font-bold text-base-content">Connections</h1>
    </div>
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
      {connections.map((connection, index) => {
        const { firstName, lastName, age, gender, about, skills, photourl } = connection;

        return (
          <div
            key={index}
            className="bg-base-300 border border-base-200 shadow-md rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300"
          >
            <img
              src={photourl}
              alt={`${firstName} ${lastName}`}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-sm"
            />
            <h2 className="mt-3 text-lg font-semibold text-base-content">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-base-content/70">
              {age} years • {gender}
            </p>
            <p className="mt-2 text-sm text-base-content/80 line-clamp-2">
              {about}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {skills &&
                skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-primary/20 text-primary font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);


}

export default Connections;