import './ToDoList.css';
import ToDoItem from './ToDoItem/ToDoItem'

const ToDoList = (props) => {

    let toDoListHeaderContainer = ''

    if(props.type == 'To Do'){
        toDoListHeaderContainer = 'red-border'
    }

    if(props.type == 'In Progress'){
        toDoListHeaderContainer = 'orange-border'
    }

    if(props.type == 'Done'){
        toDoListHeaderContainer = 'green-border'
    }
    return (
        <div className="to-do-list-container">
            <div className={toDoListHeaderContainer}>
              <p>{props.type}</p>
              <span>{props.items.length}</span>
            </div>
            <div className="to-do-list-body">
                {props.items.map((item) => (
                    <ToDoItem type={props.type} item={item} onUpdateStatus={props.onUpdateStatus}/>
                )
                )
                }
            </div>
        </div>
    )
}

export default ToDoList;