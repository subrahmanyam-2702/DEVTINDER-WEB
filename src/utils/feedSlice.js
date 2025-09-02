/*
import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
      addFeed:(state,action)=>{
            return action.payload;
      },
      removeFeed:(state,action)=> []
    }
});

export const {addFeed}=feedSlice.actions;
export default feedSlice.reducer;
*/

// feedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // use empty array
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFeed:(state,action)=>
    {
       const newFeed=state.filter((user)=> user._id!==action.payload);
       return newFeed;
    }
  }
});

export const { addFeed,removeUserFeed} = feedSlice.actions;
export default feedSlice.reducer;
