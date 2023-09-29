import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents, actions } from '../store/allStudentsSlice';

const AllStudents = () => {
    const dispatch = useDispatch()

    const allStudents = useSelector((state)=> {
        //if there are errors, send an alert and then clear the error
        if (state.allStudents.error != "") {
            alert(state.allStudents.error.message)
            dispatch(actions.clearError())
        }
        return state.allStudents.studentList
    })

    useEffect(() => {
        dispatch(fetchAllStudents())
    }, [])

    useEffect(() => {
    }, [])

    return (
        <div className="container">  
            this will be all students
        </div>
    )
}

export default AllStudents