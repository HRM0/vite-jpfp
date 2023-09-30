import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCampus= createAsyncThunk(
    "allCampus", async() => {
        try{
            const {data} = await axios.get('http://localhost:3000/api/campuses')
            console.log("check",data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

const allCampusSlice = createSlice({
    name:'allCampus',
    initialState:{
        campusList:[],
        error:""
    },
    reducers:{
        clearError(state,action) {
            state.error = ""
            return state
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllCampus.fulfilled, (state, action) => {
            state.campusList = action.payload
        })
    }
})

export const {actions} = allCampusSlice

export default allCampusSlice.reducer