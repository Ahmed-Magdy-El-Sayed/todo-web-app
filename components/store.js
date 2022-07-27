import {configureStore, createSlice} from "@reduxjs/toolkit"
import {createWrapper} from "next-redux-wrapper"

const userSlice = createSlice({
    name: "user",
    initialState: { user: {eMail:"", pass:"", jobs:[]} },
    reducers:{
        restoreUser:(state, action)=>{
            state.user.eMail=action.payload.eMail;
            state.user.pass=action.payload.pass;
            state.user.jobs=action.payload.jobs;
        },
        addUser: (state, action)=>{
            state.user.eMail=action.payload.eMail;
            state.user.pass=action.payload.pass;
            localStorage.setItem("user",JSON.stringify(state.user));
        },
        removeUser: state=>{
            localStorage.removeItem("user");
            state.user={eMail:"", pass:"", jobs:[]};
        },
        updateJobs: (state, action)=>{
            state.user.jobs = action.payload;
            localStorage.setItem("user",JSON.stringify(state.user));
        },
    }
})


const store = ()=> configureStore({
    reducer:userSlice.reducer
});

export const { restoreUser, addUser, removeUser, updateJobs } = userSlice.actions;
export const wrapper = createWrapper(store);
