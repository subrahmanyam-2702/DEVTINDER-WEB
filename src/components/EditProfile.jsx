import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photourl, setPhotUrl] = useState(user?.photourl || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [showToast,setShowToast]=useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photourl,
          age,
          gender,
          about,
          skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(()=>
      {
         setShowToast(false);
      },3000);
      //return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="flex justify-center my-20">
      <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter the First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter the Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Photo URL</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter the photo URL"
                value={photourl}
                onChange={(e) => setPhotUrl(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Age</legend>
              <input
                type="number"
                className="input"
                placeholder="Enter the age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

             <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Gender</legend>
                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
          <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">About</legend>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter something about yourself"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={3}
                />
              </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Skills</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter skills (comma separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>

            <div className="card-actions justify-center my-3">
              <button className="btn btn-primary" onClick={saveProfile}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
     <div><div className="mb-4 text-center font-bold">How it visible to others</div>
      <UserCard
        user={{ 
          firstName,
           lastName,
            age: age ? Number(age) : null,
            gender: gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "",
          about,
          photourl,
        skills: skills
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== ""),
        }}
      />
      </div>
    </div>
   {showToast&& <div className="toast toast-top toast-center">
      <div className="alert alert-success">
           <span>Profile updated successfully</span>
      </div>
    </div>}
    </>
  );
};

export default EditProfile;
