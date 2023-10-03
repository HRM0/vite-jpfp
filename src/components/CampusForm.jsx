import React,{useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { addNewCampus, editCampus, fetchAllCampus } from "../store/allCampusSlice";
import { useDispatch, useSelector } from "react-redux";

const CampusForm = (props) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(props?.data ? 
        props.data
        :useLocation().state);
    
    console.log (formData.campus)
    const allCampus = useSelector((state)=> {
        //if there are errors, send an alert and then clear the error
        if (state.allCampus.error != "") {
            alert(state.allCampus.error.message)
            dispatch(actions.clearError())
        }
        return state.allCampus.campusList
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCampus = {
            name: formData.campus.name,
            address: formData.campus.address,
            description: formData.campus.description,
            imageUrl: formData.campus.imageUrl,
            id: formData.campus.id,
        }

        try {   
            formData.type === 'Edit' ? 
                dispatch(editCampus(newCampus))
                : dispatch(addNewCampus(newCampus))
            dispatch(fetchAllCampus())
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // Fetch campus data only if it's not already loaded
        if (allCampus.length === 0) {
            dispatch(fetchAllCampus());
        }
    }, [dispatch, allCampus]);

    const labelsAndInputs = () => {
        const labels = Object.keys(formData.campus);

        return labels.map(label => (
            <div key={label} className="formElement">
                <label htmlFor={label} className="flex textLeft">{label}: </label>
                {
                        label === 'students' ? (
                            <select
                                name="students"
                                id="students"
                                value={formData.campus.student}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    campus: { ...formData.campus, campusId: e.target.value }
                                })}
                            >
                                <option value="Choose">Choose a Campus</option>
                                {allCampus.map(campus => (
                                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                                ))}
                            </select>
                        ) : (
                    ["createdAt", "updatedAt", "id"].includes(label) ? (
                        <input
                            type="text"
                            name={label}
                            value={formData.campus[label]}
                            onChange={(e) => setFormData({ ...formData, campus: { ...formData.campus, [label]: e.target.value } })}
                            disabled
                        />
                    ) : (
                        <input
                            type="text"
                            name={label}
                            value={formData.campus[label]}
                            onChange={(e) => setFormData({ ...formData, campus: { ...formData.campus, [label]: e.target.value } })}
                        />
                    )
                    )
                }
            </div>
        ));
    }

    return (
        <div className="flex fromContainer">
            <img src={formData.campus?.url} alt="campus Image" />
            <form className='flexColumn ' onSubmit={handleSubmit}>
                <h3 className='autoHeight'>{formData.type} Form</h3>
                {labelsAndInputs()}
                <button type="submit">{formData.type === 'Edit' ? "Update": 'Add Campus'}</button>
            </form>
        </div>
    )
}

export default CampusForm