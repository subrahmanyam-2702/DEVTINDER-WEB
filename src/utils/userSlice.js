import { createSlice } from "@reduxjs/toolkit";
const initialState = null; 
const userSlice=createSlice({
    name:"user",
     initialState,
    reducers:{
        addUser:(state,acton)=>
        {
            return acton.payload;
        },
        removeUser:(state,action)=>
        {
            return null;
        }
    }
})

export const {addUser,removeUser}=userSlice.actions;
export default userSlice.reducer;