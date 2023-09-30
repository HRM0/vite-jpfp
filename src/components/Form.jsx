import React,{useState} from "react";
import { useLocation } from "react-router-dom";

const Form = () => {
    const [formData, setFormData] = useState(useLocation().state);
    const data = useLocation().state;
    console.log(formData)

    const labelsAndInputs = () => {
        const labels = Object.keys(formData.student);

        return labels.map(label => (
            <div key={label} className="formElement">
                <label htmlFor={label} className="flex textLeft">{label}: </label>
                <input
                    type="text"
                    name={label}
                    value={formData.student[label]}
                    onChange={(e) => setFormData({ ...formData, student: { ...formData.student, [label]: e.target.value } })}
                />
            </div>
        ));
    }

    return (
        <div className="flex fromContainer">
            <img src={formData.student.url} alt="Student Image" />
            <form className='flexColumn '>
                <h3 className='autoHeight'>{formData.type} Form</h3>
                {labelsAndInputs()}
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default Form