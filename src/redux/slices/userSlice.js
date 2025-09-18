import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    firstName : "",
    lastName : "",
    email : "",
    gender : "",
    image : null,
}

const userSlice = createSlice({
    name : "user",
    initialState , 
    reducers : {
        setUserData : (state , action) =>{
            state.id = action.payload.id
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName,
            state.email = action.payload.email,
            state.gender = action.payload.gender,
            state.image = action.payload.image
        } , 
        clearUserData : (state , action) =>{
            state.firstName = "",
            state.lastName = "",
            state.email = "",
            state.gender = "",
            state.image = null
        }
    }
})

export const {setUserData , clearUserData } = userSlice.actions
export default userSlice.reducer