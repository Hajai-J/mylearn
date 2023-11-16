import './App.css';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import { useState, useEffect } from 'react';
import AddItem from './Components/AddItem';
import SearchItem from './Components/SearchItem';
import apiRequest from './Components/apiRequest';


function App() {
    const API_URL = "http://localhost:3500/items";
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setfectError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error("Data not received");
                const listItems = await response.json();
                setItems(listItems);
                setfectError(null);
            } catch (err) {
                setfectError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        setTimeout(() => {
            (async () => fetchItem())()
        }, 2000)
    }, [])

    const handleCheck =  async (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, check: !item.check } : item)
        setItems(listItems)
        const myItem = listItems.filter((item) => item.id === id)
        const updateOption = {
            method : "PATCH",
            headers : {
                'Content-type': 'application/json'
            },
            body   : JSON.stringify({checked:myItem[0].checked})
        }
        const reqUrl = `${API_URL}/${id}`
        const result = await apiRequest(reqUrl,updateOption)
        if(result) setfectError(result)
    }

    const handleDel = async (id) => {
        const delItem = items.filter((item) =>
            item.id !== id
        )
        setItems(delItem)
        const deleteOption = {
            method : "DELETE"
        }
        const reqUrl = `${API_URL}/${id}`
        const result = await apiRequest(reqUrl,deleteOption)
        if(result) setfectError(result)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newItem) return;
        console.log(newItem)
        addItem(newItem)
        setNewItem('')
    }

    const addItem = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1
        const addNewItem = { id, check: false, item }
        const listItems = [...items, addNewItem]
        setItems(listItems)

    const postOption = {
        method : "POST",
        headers : {
            'Content-type': 'application/json'
        },
        body   : JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL,postOption)
    if(result) setfectError(result)
    }

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
            <main>
                {isLoading && <p>{`Loading Items..`}</p>}
                {fetchError && <p>{`Error: ${fetchError}`}</p>}
                {!isLoading && !fetchError && <Content

                    items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                    handleCheck={handleCheck}
                    handleDel={handleDel}
                />}
            </main>
            <Footer
                length={items.length}
            />

        </div>
    );
}

export default App;
