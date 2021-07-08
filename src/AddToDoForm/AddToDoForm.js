import { useState } from 'react';
import './AddToDoForm.css';

const AddToDoForm = (props) => {

    const [ toDoName, setToDoName ] = useState('');

    const changeNameHandler = (event) => {
        setToDoName(event.target.value);
    }

    const createToDoItem = () => {
        props.onCreate(toDoName)
        // set name to empty
    }

    return (
        <div className="form">
            <p className="to-do-label">To Do List</p>
            <input onChange={changeNameHandler} value={toDoName} />
            <span className="add-button" onClick={createToDoItem}>+</span>
        </div>
    )
}
export default AddToDoForm;