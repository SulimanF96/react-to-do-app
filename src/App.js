import './App.css';
import AddToDoForm from './AddToDoForm/AddToDoForm';
import { useDebugValue, useEffect, useState } from 'react';
import ToDoList from './ToDoList/ToDoList'

function App() {

  const [ toDoItems, setToDoItems ] = useState([]);
  const [ inProgressItems, setInProgressItems] = useState([]);
  const [ doneItems, setDoneItems] = useState([]);


  useEffect(() => {
    getAllToDoListsItems();
  }, [])

  const prepareToDoLists = (toDoList) => {
    for ( const key in toDoList){
      if(toDoList[key]['status'] == 'TO_DO'){
        setToDoItems(prevState => {
          return [
            ...prevState, {
              key,
              ...toDoList[key]
            }
          ]
        })
      }

      if(toDoList[key]['status'] == 'IN_PROGRESS'){
        setInProgressItems(prevState => {
          return [
            ...prevState, {
              key,
              ...toDoList[key]
            }
          ]
        })
      }

      if(toDoList[key]['status'] == 'DONE'){
        setDoneItems(prevState => {
          return [
            ...prevState, {
              key,
              ...toDoList[key]
            }
          ]
        })
      }
    }
  }


const getAllToDoListsItems = async () => {
  const response = await fetch('https://react-198ef-default-rtdb.firebaseio.com/to-do-list.json');
  const data = await response.json();
  prepareToDoLists(data);
}


const createToDoListsItem = async (toDoName) => {
  if(toDoName){
    const response = await fetch('https://react-198ef-default-rtdb.firebaseio.com/to-do-list.json', {
      method: "POST",
      body: JSON.stringify({
        name: toDoName,
        status: "TO_DO"
      })
    });

    const data = response.json();
    if(response.status == 200){
      setToDoItems([
        ...toDoItems,
        {
          key: data.name,
          name: toDoName,
          status: 'TO_DO'
        }
      ]);
    }

  }
}

const updateToDoItemStatus = async (toDoItem, toDoItemStatus) => {
  if(toDoItemStatus == 'FINISH'){
    deleteToDoItem(toDoItem.key)
  } else{
    const response = await fetch(`https://react-198ef-default-rtdb.firebaseio.com/to-do-list/${toDoItem.key}.json`, {
      method: "PATCH",
      body: JSON.stringify({
        status: toDoItemStatus
      })
    });

    if(response.status == 200){
      if(toDoItemStatus == 'IN_PROGRESS'){
        let updatedToDoItems = [...toDoItems];
        updatedToDoItems = updatedToDoItems.filter((item) => item.key != toDoItem.key);
        setToDoItems([...updatedToDoItems]);
        setInProgressItems(prevState => {
          return [
            ...prevState, {
             key: toDoItem.key,
             name: toDoItem.name,
             status: toDoItemStatus
            }
          ]
        })
      }

      if(toDoItemStatus == 'DONE'){
        let updatedInProgressItems = [...inProgressItems];
        updatedInProgressItems = updatedInProgressItems.filter((item) => item.key != toDoItem.key);
        setInProgressItems([...updatedInProgressItems]);
        setDoneItems(prevState => {
          return [
            ...prevState, {
             key: toDoItem.key,
             name: toDoItem.name,
             status: toDoItemStatus
            }
          ]
        })
      }
    }
    
  }
} 

const deleteToDoItem = async (toDoId) => {
  const response = await fetch(`https://react-198ef-default-rtdb.firebaseio.com/to-do-list/${toDoId}.json`, {
    method: 'DELETE'
  });
  
  if(response.status == 200){
    let updatedDoneItems = [...doneItems];
    updatedDoneItems = updatedDoneItems.filter((item) => item.key != toDoId);
    setDoneItems([...updatedDoneItems]);
  }
}

  return (
    <div className="App-Container">
     <AddToDoForm onCreate={createToDoListsItem}/>
     <div className="to-do-container">
        <ToDoList type="To Do" items={toDoItems} onUpdateStatus={updateToDoItemStatus}/>
        <ToDoList type="In Progress" items={inProgressItems} onUpdateStatus={updateToDoItemStatus}/>
        <ToDoList type="Done" items={doneItems} onUpdateStatus={updateToDoItemStatus}/>
     </div>
    </div>
  );
}

export default App;
