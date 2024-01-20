import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post" , 
    initialState:{
        isFetching:false , 
        currentPost:null , 
        isError:false , 
    } , 
    reducers:{
        postStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
        } ,
        postSuccess:(state , action)=>{
            state.isFetching = false;
            state.currentPost = action.payload;
        } 
        ,postFailure:(state)=>{
            state.isFetching = false;
            state.isError = true;
        } ,
        
    }
});

export const {postStart , postSuccess , postFailure} = postSlice.actions;
export default postSlice.reducer;