import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllStudents = createAsyncThunk(
    "allStudents", async() => {
        try{
            const {data} = await axios.get('http://localhost:3000/api/students')
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

export const editStudent = createAsyncThunk(
    "editStudent", async (student) => {
        try {
            const {data} = await axios.put(`http://localhost:3000/api/students/${student.id}`,student)
            return data
        } catch (err) {
            throw new Error(err.response.data.errors[0].message)
        }
    }
)

export const addNewStudent = createAsyncThunk(
    "newStudent", async(student) => {
        try {
            const {data} = await axios.post('http://localhost:3000/api/students/', student)
            return data
        } catch (err) {
            throw new Error(err.response.data.errors[0].message)
        }
    }
)

export const deleteSingleStudent = createAsyncThunk(
    "deleteStudent", async (StudentId) => {
        try {
            const {data} = await axios.delete(`http://localhost:3000/api/students/${StudentId}`)
            return StudentId
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
        }),
        builder.addCase(editStudent.fulfilled, (state, action) => {
            console.log(state.studentList,state.studentList[action.payload.id],action.payload)
            state.studentList[action.payload.id] = action.payload
        }),
        builder.addCase(addNewStudent.fulfilled, (state, action) => {
            const currentStudent = state.studentList
            currentStudent.push(action.payload)
            state.studentList = [...currentStudent]
        }),
        builder.addCase(addNewStudent.rejected, (state, action) => {
            state.error= action.error
        }),
        builder.addCase(deleteSingleStudent.fulfilled, (state, action) => {
            state.studentList = state.studentList.filter(el => el.id != action.payload)
        })
    }
})

export const {actions} = allStudentsSlice

export default allStudentsSlice.reducer