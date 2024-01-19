import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user" , 
    initialState:{
        isFetching:false , 
        currentUser:null , 
        isError:false , 
        follow:false , 
    } , 
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
        } ,
        loginSuccess:(state , action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        } 
        ,loginFailure:(state)=>{
            state.isFetching = false;
            state.isError = true;
        } ,
        logOut:(state)=>{
            state.currentUser = null ; 
            state.isError = false;
        } , 
        registerStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
        } ,
        registerSuccess:(state , action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        } ,
        registerFailure:(state)=>{
            state.isFetching = false;
            state.isError = true;
        } ,
    }
});

export const {loginStart , loginSuccess , loginFailure , logOut , registerStart , registerSuccess , registerFailure} = userSlice.actions;
export default userSlice.reducer;