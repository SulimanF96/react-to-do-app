import './ToDoItem.css';

const ToDoItem = (props) => {

    let toDoItemBorderClass = '';
    let nextStatus = '';
    let nextStatusLabel = '';
    let nextStatusColorClass = '';

    if(props.type == 'To Do'){
        toDoItemBorderClass = 'red-to-do-item-border';
        nextStatus = 'IN_PROGRESS';
        nextStatusLabel = 'In Progress';
        nextStatusColorClass = 'orange';
    }

    if(props.type == 'In Progress'){
        toDoItemBorderClass = 'orange-to-do-item-border';
        nextStatus = 'DONE';
        nextStatusLabel = 'Done';
        nextStatusColorClass = 'green';
    }

    if(props.type == 'Done'){
        toDoItemBorderClass = 'green-to-do-item-border';
        nextStatus = 'FINISH';
        nextStatusLabel = 'Finish';
        nextStatusColorClass = 'red';
    }

    return (
        <div className={`to-do-item-container ${toDoItemBorderClass}`}>
        <p>{props.item.name}</p>
        <div className="to-do-items-actions">
           <span className={`next-status ${nextStatusColorClass}`}
                 onClick={(toDoItem) => {props.onUpdateStatus(props.item, nextStatus)}}>{nextStatusLabel}</span>
        </div>
        </div>
    )
    
}

export default ToDoItem;