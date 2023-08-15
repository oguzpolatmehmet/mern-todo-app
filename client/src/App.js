import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');


  const addItem = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5500/api/item', {item:itemText})
      console.log(res)
      setListItems(prev =>[...prev,res.data]);
      setItemText('');
    }catch(error){
      console.log(error)
    }
  }

  //
  useEffect(()=>{
    const getItemList = async()=>{
      try{
        const res = await axios.get('http://localhost:5500/api/items')
        setListItems(res.data)
      }catch(error){
        console.log(error)
      }
    }
    getItemList()
  },[])

  // delete

  const deleteItem = async (id)=>{
    try{
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems)
      // console.log(res.data)
    }catch(error){
      console.log(error)
    }
  }

  // update
  const updateItem = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item=> item._id === isUpdating)
      const updatedItem = listItems[updatedItemIndex].item = updateItemText
      setUpdateItemText('merhaba');
      setIsUpdating('');
    }catch(error){
      console.log(error)
    }
  }

  // update render
  const renderUpdateForm = ()=>(
    <form className='update-form' onSubmit={(e)=>{updateItem(e)}}>
      <input className='update-new-input' type='text' placeholder='New TodoItem' onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText}></input>
      <button className='update-new-btn' type='submit'>Update ToDo</button>
    </form>
  )

  return (
    <div className="App-Layout">
      <div className="App">
      <h1>Hello React TodoApp</h1>
      <form className="form" onSubmit={e=> addItem(e)}>
        <input type="text" placeholder="Add Todo Item" onChange={ e=>{setItemText(e.target.value)}} value={itemText} />
        <button type="submit">Add ToDo</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item =>(
            <div className="todo-item">
              {
                isUpdating === item._id
                ? renderUpdateForm()
                : <>
                    <p className="item-content">{item.item}</p>
                    <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                    <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                  </>
              }
            </div>
          ))
        }
      </div>
    </div>
    </div>
  );
}

export default App;
