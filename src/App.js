import React, { useState, useEffect } from 'react'
import Context from './context'
import TodoList from './components/Todo/TodoList'
import AddTodo from './components/Todo/AddTodo'
import Loader from './components/Loader'


const initialState = [
  {id: 1, completed: false, title: 'Купить хлеб'},
  {id: 2, completed: true, title: 'Купить масло'},
  {id: 3, completed: false, title: 'Купить молоко'}
]

function App() {
  const [todos, setTodos] = useState(initialState)
  const [lastId, setLastId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!loading) {
      return
    }

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(json => {
      setTodos(json)
      setLoading(false)
    })
  }, [loading])

  const newLastId = todos.length ? +todos[todos.length-1].id + 1 : null
  if (newLastId !== lastId) {
    setLastId(newLastId)
  }

  const fetchFromServer = () => {
    setLoading(true)
  }

  const toggleItem = (id) => {
    setTodos(todos.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    }))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id))
  }
  const addTodo = (title) => {
    const id = lastId + 1
    setLastId(id)
    setTodos([...todos, {
      id,
      title,
      completed: false
    }])
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="App wrapper">
        <h1>Todo List</h1>
        <button onClick={fetchFromServer} disabled={loading}>Fetch from Server</button>
        <AddTodo handleCreate={addTodo} />
        {todos.length ? (
        <TodoList todos={todos} handleToggle={toggleItem} />
        ) : (
          loading ? <Loader /> : 'No todos'
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
