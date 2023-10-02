import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents, actions,deleteSingleStudent } from '../store/allStudentsSlice';
import {v1 as uuid} from 'uuid'
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';

const AllStudents = () => {
    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(false)
    const [selectedForm, setSelectedForm] = useState(null);

    const newStudent = {
        firstName: "firstName",
        lastName: "lastName",
        email: "email@email.com",
        gpa: "gpa",
        imageUrl: "imageUrl",
        campus: 'choose',
    }

    const allStudents = useSelector((state)=> {
        //if there are errors, send an alert and then clear the error
        if (state.allStudents.error != "") {
            alert(state.allStudents.error.message)
            dispatch(actions.clearError())
        }
        return state.allStudents.studentList
    })

    const handleExpand = (id) => {
        setSelectedForm(id)
        setExpanded(!expanded)
        console.log("check",id)
    }

    function handleDelete(id) {
        dispatch(deleteSingleStudent(id))
    }

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
                            <button onClick={() => handleExpand('add')}>Add</button>
                            <button>Delete</button>
                        </div>
                    </li>
                    {expanded ? selectedForm === 'add' && 
                        <li className='flex autoWidth'>
                            <StudentForm data={{student:newStudent,type:'Add'}} />
                        </li>
                        : <></> }
                {allStudents && allStudents.length > 0 ? 
                    allStudents.map(student => {
                        return (
                            <li key={uuid()}>
                                <div className='flexColumn '>
                                <div className='flex '>
                                    <div className='flex '>
                                        <div className='flex autoWidth'>{student.id}. </div>
                                        <div className='flex '> {student.lastName}, {student.firstName}</div>
                                        <div className='flex '>{student.campus?.name ? student.campus?.name : 'N/A'}</div>
                                    </div>
                                    <div className='flex autoWidth'>
                                        <button onClick={() => handleExpand(student.id)}>Edit</button>
                                        <button onClick={() => handleDelete(student.id)}>Delete</button>
                                    </div>
                                </div>
                                    {expanded ? selectedForm === student.id && 
                                        <div className='flex'>
                                            <StudentForm data={{student:student,type:'Edit'}} />
                                        </div>
                                        : <></> 
                                    }
                                </div>
                            </li>
                        )
                    }): <li>no students found</li>}
            </ul>
    )
}

export default AllStudents