import axios from "axios";
import { VITE_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

     if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading users...</p>
      </div>
    );
  if (!feed || feed.length === 0) return <p className="text-center my-20 font-bold">No users available</p>;

  return (
    <div className="flex justify-center my-15">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
