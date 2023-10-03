import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCampus= createAsyncThunk(
    "allCampus", async() => {
        try{
            const {data} = await axios.get('http://localhost:3000/api/campuses')
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

export const addNewCampus = createAsyncThunk(
    "newCampus", async(campus) => {
        try {
            const {data} = await axios.post("http://localhost:3000/api/campuses", campus)
            return data
        } catch (err) {
            throw new Error(err.response.data.errors[0].message)
        }
    }
)

export const deleteSingleCampus = createAsyncThunk(
    "deleteCampus", async (campusId) => {
        try {
            const {data} = await axios.delete(`http://localhost:3000/api/campuses/${campusId}`)
            return campusId
        } catch (err) {
            console.log(err)
        }
    }
)

export const editCampus = createAsyncThunk(
    "editCampus", async (campus) => {
        try {
            const {data} = await axios.put(`http://localhost:3000/api/campuses/${campus.id}`,campus)
            
            return data
        } catch (err) {
            throw new Error(err.response.data.errors[0].message)
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
        }),
        builder.addCase(editCampus.fulfilled, (state, action) => {
            state.campusList[action.payload.id] = action.payload
        }),
        builder.addCase(addNewCampus.fulfilled, (state, action) => {
            const currentCampus = state.campusList
            currentCampus.push(action.payload)
            state.campusList = [...currentCampus]
        }),
        builder.addCase(addNewCampus.rejected, (state, action) => {
            state.error= action.error
        }),
        builder.addCase(deleteSingleCampus.fulfilled, (state, action) => {
            state.campusList = state.campusList.filter(el => el.id != action.payload)
        })
    }
})

export const {actions} = allCampusSlice

export default allCampusSlice.reducer