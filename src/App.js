import './App.css';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import { useState,useEffect } from 'react';
import AddItem from './Components/AddItem';
import SearchItem from './Components/SearchItem';


function App() {
    const [items, setItems] = useState([]);

    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
      JSON.parse(localStorage.getItem('todo_list'))
    },[])

    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, check: !item.check } : item)
        setItems(listItems)
        localStorage.setItem("todo_list", JSON.stringify(listItems))
    }

    const handleDel = (id) => {
        const delItem = items.filter((item) =>
            item.id !== id
        )
        setItems(delItem)
        localStorage.setItem("todo_list", JSON.stringify(delItem))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newItem) return;
        console.log(newItem)
        addItem(newItem)
        setNewItem('')
    }

    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1
        const addNewItem = { id, check: false, item }
        const listItems = [...items, addNewItem]
        setItems(listItems)
        localStorage.setItem("todo_list", JSON.stringify(listItems))
    }
    console.log("Hello commit")

    return (
        <div className="App">
            <Header title="To Do-List" />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem
                search={search}
                setSearch={setSearch} 
            />
            <Content
                items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                handleCheck={handleCheck}
                handleDel={handleDel}
            />
            <Footer
                length={items.length}
            />

        </div>
    );
}

export default App;
