import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

    const dispatch=useDispatch();
    const {_id,firstName, lastName, photourl, gender, age, about, skills } = user;
    const handlerequest=async (status,_id)=>
    {
        try{
             const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,
                {},
                {withCredentials:true}
             );
           dispatch(removeUserFeed(_id));
        }catch(err)
        {
            console.error("Invalid request");
        }
    }
    if (!user) {
        return (
            <div className="card bg-base-300 w-80 h-150 shadow-sm mb-20 flex items-center justify-center">
                <p className="text-gray-500">No user data</p>
            </div>
        );
    }
    //console.log(user);
    return (
        <div className="card bg-base-300 w-80 h-150 shadow-sm mb-20">
            <figure>
                <img
                    src={photourl}
                    alt={`${firstName || "Unknown"} ${lastName || ""}`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {(firstName ? firstName.toUpperCase() : "UNKNOWN") +
                        " " +
                        (lastName ? lastName.toUpperCase() : "")}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about || "No description available."}</p>
                            {Array.isArray(skills) && skills.length > 0 && (
                    <div className="mt-2">
                        <h3 className="font-semibold">Skills:</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                        {skills.map((skill, idx) => (
                            <span
                            key={idx}
                            className="badge badge-primary badge-outline px-2 py-1"
                            >
                            {skill}
                            </span>
                        ))}
                        </div>
                    </div>
                    )}
                <div className="card-actions justify-center">
                    <button className="btn btn-error mx-2" onClick={()=>handlerequest("ignored",_id)}>Ignored</button>
                    <button className="btn btn-success" onClick={()=>handlerequest("interested",_id)}>Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
