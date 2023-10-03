import React,{useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { fetchAllCampus } from "../store/allCampusSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNewStudent, editStudent, fetchAllStudents } from "../store/allStudentsSlice";

const StudentForm = (props) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(props?.data ? 
        props.data
        :useLocation().state);
    console.log(formData)
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
        const newStudent = {
            firstName: formData.student.firstName,
            lastName: formData.student.lastName,
            email: formData.student.email,
            gpa: formData.student.gpa,
            imageUrl: formData.student.imageUrl,
            campusId: Number(formData.student.campusId),
            id:formData.student.id
        }

        try {   
            formData.type === 'Edit' ? 
                dispatch(editStudent(newStudent))
                : dispatch(addNewStudent(newStudent))
            dispatch(fetchAllStudents())
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (allCampus.length === 0) {
            dispatch(fetchAllCampus());
        }
    }, [dispatch, allCampus]);

    const labelsAndInputs = () => {
        const labels = Object.keys(formData.student);

        return labels.map(label => (
            <div key={label} className="formElement">
                <label htmlFor={label} className="flex textLeft">{label}: </label>
                {
                    label === 'campus' ? (
                        <select
                            name="campus"
                            id="campus"
                            value={formData.student.campusId}
                            onChange={(e) => setFormData({
                                ...formData,
                                student: { ...formData.student, campusId: e.target.value }
                            })}
                        >
                            <option value="Choose">Choose a Campus</option>
                            {allCampus.map(campus => (
                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                            ))}
                        </select>
                    ) : (
                        ["createdAt", "updatedAt", "campusId", "id"].includes(label) ? (
                            <input
                                type="text"
                                name={label}
                                value={formData.student[label]}
                                onChange={(e) => setFormData({ ...formData, student: { ...formData.student, [label]: e.target.value } })}
                                disabled
                            />
                        ) : (
                            <input
                                type="text"
                                name={label}
                                value={formData.student[label]}
                                onChange={(e) => setFormData({ ...formData, student: { ...formData.student, [label]: e.target.value } })}
                            />
                        )
                    )
                }
            </div>
        ));
    }

    return (
        <div className="flex fromContainer">
            <img src={formData.student?.url} alt="Student Image" />
            <form className='flexColumn ' onSubmit={handleSubmit}>
                <h3 className='autoHeight'>{formData.type} Form</h3>
                {labelsAndInputs()}
                <button type="submit">{formData.type === 'Edit' ? "Update": 'Add Student'}</button>
            </form>
        </div>
    )
}

export default StudentForm