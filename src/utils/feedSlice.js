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
    removeFeed: () => []
  }
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;
