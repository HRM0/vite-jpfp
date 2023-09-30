import React, {useEffect, useState} from 'react'
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

    return (
            <ul className="contentContainer"> 
                 <li>
                    <div className='flex'>
                        <h3 className='flex autoWidth'>Id</h3>
                        <h3 className='flex '> Name</h3>
                        <h3 className='flex '>Campus</h3>
                    </div>
                    <div className='flex autoWidth'>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </li>
                {allStudents && allStudents.length > 0 ? 
                    allStudents.map(student => {
                        return (
                            <li>
                                <div className='flex '>
                                    <div className='flex autoWidth'>{student.id}. </div>
                                    <div className='flex '> {student.lastName}, {student.firstName}</div>
                                    <div className='flex '>{student.campus?.name ? student.campus?.name : 'N/A'}</div>
                                </div>
                                <div className='flex autoWidth'>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </li>
                        )
                    }): <li>no students found</li>}
            </ul>
    )
}

export default AllStudents