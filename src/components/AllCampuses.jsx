import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleCampus, fetchAllCampus } from '../store/allCampusSlice';
import {v1 as uuid} from 'uuid'
import CampusForm from './CampusForm';

const AllCampuses = () => {
    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(false)
    const [selectedForm, setSelectedForm] = useState(null);

    const newCampus = {
        name: "name",
        address: "address",
        description: "description",
        imageUrl: "imageUrl",
        campus: 'choose',
    }

    const allCampus = useSelector((state)=> {
        //if there are errors, send an alert and then clear the error
        if (state.allCampus.error != "") {
            alert(state.allCampus.error.message)
            dispatch(actions.clearError())
        }
        return state.allCampus.campusList
    })
    
    const handleExpand = (id) => {
        setSelectedForm(id)
        setExpanded(!expanded)
    }

    function handleDelete(id) {
        dispatch(deleteSingleCampus(id))
    }

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
                        <button onClick={() => handleExpand('add')}>Add</button>
                        <button>Delete</button>
                    </div>
                </li>
                {expanded ? selectedForm === 'add' && 
                        <li className='flex autoWidth'>
                            <CampusForm data={{campus:newCampus,type:'Add'}} />
                        </li>
                        : <></> }
                {allCampus && allCampus.length > 0 ? 
                    allCampus.map(campus => {
                        return (
                            <li key={uuid()}>
                                <div className='flexColumn '>
                                    <div className='flex '>
                                        <div className='flex '>
                                            <div className='flex autoWidth'>{campus.id}. </div>
                                            <div className='flex '> {campus.name}</div>
                                            <div className='flex '>{campus.students && campus.students?.length > 0 ? 
                                                campus.students.length:
                                                '0'}</div>
                                        </div>
                                        <div className='flex autoWidth'>
                                            <button onClick={() => handleExpand(campus.id)}>Edit</button>
                                            <button onClick={() => handleDelete(campus.id)}>Delete</button>
                                        </div>
                                    </div>
                                    {expanded ? selectedForm === campus.id && 
                                        <div className='flex'>
                                            <CampusForm data={{campus:campus,type:'Edit'}} />
                                        </div>
                                        : <></> 
                                    }
                                </div>
                            </li>
                        )
                    }): <li>no campus found</li>}
            </ul>
    )
}

export default AllCampuses