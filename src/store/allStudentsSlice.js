import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllStudents = createAsyncThunk(
    "allStudents", async() => {
        try{
            const {data} = await axios.get('http://localhost:3000/api/students')
            console.log("check",data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

const allStudentsSlice = createSlice({
    name:'allStudents',
    initialState:{
        studentList:[],
        error:""
    },
    reducers:{
        clearError(state,action) {
            state.error = ""
            return state
        },
        sortName(state,action) {
            state.studentList.sort((a,b) => (a["lastName"]> b["lastName"])? 1 : -1)
            return state
        },
        sortGpa(state,action) {
            state.studentList.sort((a,b) => (b.gpa- a.gpa))
            return state
        },
        filterUnregistered(state,action) {
            state.studentList= state.studentList.filter(student => student.campusId === null)
            return state
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllStudents.fulfilled, (state, action) => {
            state.studentList = action.payload
        })
    }
})

export const {actions} = allStudentsSlice

export default allStudentsSlice.reducer