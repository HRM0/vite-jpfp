import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampus } from '../store/allCampusSlice';
import {v1 as uuid} from 'uuid'

const AllCampuses = () => {
    const dispatch = useDispatch()

    const allCampus = useSelector((state)=> {
        //if there are errors, send an alert and then clear the error
        if (state.allCampus.error != "") {
            alert(state.allCampus.error.message)
            dispatch(actions.clearError())
        }
        return state.allCampus.campusList
    })
    console.log(allCampus)
    useEffect(() => {
        dispatch(fetchAllCampus())
    }, [])

    return (
        <ul className="contentContainer"> 
                 <li>
                    <div className='flex'>
                        <h3 className='flex autoWidth'>Id</h3>
                        <h3 className='flex '> Name</h3>
                        <h3 className='flex '># of Students</h3>
                    </div>
                    <div className='flex autoWidth'>
                        <button>Add</button>
                        <button>Delete</button>
                    </div>
                </li>
                {allCampus && allCampus.length > 0 ? 
                    allCampus.map(campus => {
                        return (
                            <li key={uuid()}>
                                <div className='flex '>
                                    <div className='flex autoWidth'>{campus.id}. </div>
                                    <div className='flex '> {campus.name}</div>
                                    <div className='flex '>{campus.students && campus.students?.length > 0 ? 
                                        campus.students.length:
                                        '0'}</div>
                                </div>
                                <div className='flex autoWidth'>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </li>
                        )
                    }): <li>no campus found</li>}
            </ul>
    )
}

export default AllCampuses