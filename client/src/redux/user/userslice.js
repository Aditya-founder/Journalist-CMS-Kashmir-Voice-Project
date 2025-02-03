import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
            state.error = null;
        },

        signInSuccess:(state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure :(state , action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateStart : (state)=>{
            state.loading = true;
            state.error = null;
        },
        updateSuccess:(state, action)=>{
            // state.currentUser = { ...state.currentUser, ...action.payload }; // Merge instead of replace
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            // Persist updated user state to localStorage
        // localStorage.setItem("user", JSON.stringify(state.currentUser)); // Manually persist updated data to localStorage

        },
        updateFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteStart: (state)=>{
            state.loading = true;
            state.error = null;
        },
        deleteSuccess : (state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteFailure : (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },

        signoutSuccess : (state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        
        }
    }
})

export const {signInStart, signInSuccess, signInFailure,
     updateStart, updateSuccess, updateFailure,
      deleteFailure, deleteStart,deleteSuccess, 
    signoutSuccess} = userSlice.actions;

export default userSlice.reducer;