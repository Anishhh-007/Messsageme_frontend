import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice'
import searchSlice from './slices/searchSlice'
import requestSlice from './slices/requestSlice'
import friendsSlice from './slices/friendsSlice'
import targetIDSlice from './slices/targetIDSlice'

 const store = configureStore({
    reducer :{
        user : userSlice , 
        search : searchSlice,
        request : requestSlice,
        friends : friendsSlice,
        targetID : targetIDSlice
       
    }
})

export default store